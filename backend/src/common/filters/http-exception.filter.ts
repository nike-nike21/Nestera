import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  ValidationError as NestValidationError,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Patterns emitted by RpcClientWrapper that indicate a Soroban/Horizon
 * RPC timeout or full-endpoint-exhaustion event.
 */
const RPC_TIMEOUT_PATTERN = /request timeout after \d+ms/i;
const RPC_EXHAUSTED_PATTERN = /all \w+ rpc endpoints failed/i;
const DB_CONNECTION_PATTERNS = [
  /econnrefused/i,
  /enotfound/i,
  /connection terminated unexpectedly/i,
  /password authentication failed/i,
  /failed to connect/i,
  /connection timeout/i,
  /connect etimedout/i,
];

/** Classify an unknown exception as an RPC-layer error. */
function isRpcFallbackError(exception: unknown): exception is Error {
  if (!(exception instanceof Error)) return false;
  return (
    RPC_TIMEOUT_PATTERN.test(exception.message) ||
    RPC_EXHAUSTED_PATTERN.test(exception.message)
  );
}

function isDatabaseConnectionError(exception: unknown): exception is Error {
  if (!(exception instanceof Error)) return false;

  const message = exception.message || '';
  const code = (exception as Error & { code?: string }).code || '';

  return (
    DB_CONNECTION_PATTERNS.some((pattern) => pattern.test(message)) ||
    [
      'ECONNREFUSED',
      'ENOTFOUND',
      'ETIMEDOUT',
      '57P01',
      '08001',
      '08006',
    ].includes(code)
  );
}

/** Extract field path from nested validation errors */
function extractFieldPath(
  propertyPath: string,
  property: string,
): string {
  return propertyPath ? `${propertyPath}.${property}` : property;
}

/** Format validation errors with exact field paths and constraints */
function formatValidationErrors(
  errors: NestValidationError[],
  parentPath = '',
): Array<{ field: string; message: string; constraint?: string; values?: unknown[] }> {
  const formattedErrors: Array<{
    field: string;
    message: string;
    constraint?: string;
    values?: unknown[];
  }> = [];

  for (const error of errors) {
    const field = extractFieldPath(parentPath, error.property);

    if (error.constraints) {
      for (const [constraint, message] of Object.entries(error.constraints)) {
        formattedErrors.push({
          field,
          message,
          constraint,
        });
      }
    }

    if (error.children && error.children.length > 0) {
      const childErrors = formatValidationErrors(error.children, field);
      formattedErrors.push(...childErrors);
    }
  }

  return formattedErrors;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // ── RPC / Blockchain layer errors ────────────────────────────────────────
    if (isRpcFallbackError(exception)) {
      const isTimeout = RPC_TIMEOUT_PATTERN.test(exception.message);
      const httpStatus = isTimeout
        ? HttpStatus.GATEWAY_TIMEOUT // 504 – a single endpoint timed out
        : HttpStatus.SERVICE_UNAVAILABLE; // 503 – all fallbacks exhausted

      this.logger.error(
        `[RPC Fallback] ${request.method} ${request.url} → ${httpStatus} | ${exception.message}`,
        exception.stack,
        {
          errorCode: isTimeout
            ? 'SOROBAN_RPC_TIMEOUT'
            : 'SOROBAN_RPC_EXHAUSTED',
          path: request.url,
          method: request.method,
          timestamp: new Date().toISOString(),
        },
      );

      return response.status(httpStatus).json({
        success: false,
        statusCode: httpStatus,
        errorCode: isTimeout ? 'SOROBAN_RPC_TIMEOUT' : 'SOROBAN_RPC_EXHAUSTED',
        timestamp: new Date().toISOString(),
        path: request.url,
        message: isTimeout
          ? 'Soroban RPC request timed out. The network may be under load.'
          : 'All Soroban RPC endpoints are currently unavailable. Please retry later.',
      });
    }

    // ── Database connectivity errors ────────────────────────────────────────
    if (isDatabaseConnectionError(exception)) {
      const statusCode = HttpStatus.SERVICE_UNAVAILABLE;

      this.logger.error(
        `[DB Connection] ${request.method} ${request.url} → ${statusCode} | ${exception.message}`,
        exception.stack,
      );

      return response.status(statusCode).json({
        success: false,
        statusCode,
        errorCode: 'DB_CONNECTION_ERROR',
        timestamp: new Date().toISOString(),
        path: request.url,
        message:
          'Database connection is currently unavailable. Please try again shortly.',
      });
    }

    // ── Standard HTTP exceptions ─────────────────────────────────────────────
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;
    let validationErrors: Array<{
      field: string;
      message: string;
      constraint?: string;
      values?: unknown[];
    }> | undefined;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        const msg = responseObj.message;

        // Handle validation errors (array of ValidationError objects)
        if (Array.isArray(msg)) {
          validationErrors = formatValidationErrors(
            msg as NestValidationError[],
          );
          message = `${validationErrors.length} validation error(s)`;
        } else {
          message = String(msg ?? 'An error occurred');
        }
      } else {
        message = 'An error occurred';
      }
    } else {
      message = status >= 500 ? 'Internal server error' : 'An error occurred';
    }

    const errorResponse: Record<string, unknown> = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof message === 'object' && message !== null
          ? (message as { message?: string }).message
          : message,
    };

    // Attach validation errors if present
    if (validationErrors && validationErrors.length > 0) {
      errorResponse.errors = validationErrors;
    }

    // Attach rate limit info if present (from ThrottlerException)
    const throttlerHeaders = this.extractThrottlerInfo(request);
    if (throttlerHeaders && status === 429) {
      errorResponse.retryAfter = throttlerHeaders.retryAfter;
      errorResponse.resetTime = throttlerHeaders.resetTime;
      errorResponse.endpoint = `${request.method} ${request.path}`;
      errorResponse.rateLimitTier = throttlerHeaders.tier;
    }

    if (status >= 500) {
      this.logger.error(
        `HTTP ${status} ${request.method} ${request.url} - ${message}`,
        exception instanceof Error ? exception.stack : '',
      );
    }

    response.status(status).json(errorResponse);
  }

  private extractThrottlerInfo(request: Request): {
    retryAfter: number;
    resetTime: string;
    tier: string;
  } | null {
    const retryAfterHeader = request.headers['x-ratelimit-retry-after'];
    const resetHeader = request.headers['x-ratelimit-reset'];
    const tierHeader = request.headers['x-ratelimit-tier'];

    if (retryAfterHeader || resetHeader) {
      return {
        retryAfter: typeof retryAfterHeader === 'string' ? parseInt(retryAfterHeader, 10) : 60,
        resetTime: typeof resetHeader === 'string' ? resetHeader : new Date(Date.now() + 60000).toISOString(),
        tier: typeof tierHeader === 'string' ? tierHeader : 'default',
      };
    }

    return null;
  }
}
