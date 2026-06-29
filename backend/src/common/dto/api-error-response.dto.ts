import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponseDto {
  @ApiProperty({
    example: 400,
    description: 'HTTP status code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Bad Request',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'BadRequestException',
    description: 'Error type',
  })
  error: string;

  @ApiProperty({
    example: '2026-03-30T04:57:29.140Z',
    description: 'Timestamp of the error',
  })
  timestamp: string;

  @ApiProperty({
    example: '/api/v2/savings/goals',
    description: 'Request path',
  })
  path?: string;
}

export class ValidationErrorItem {
  @ApiProperty({
    example: 'goalName',
    description: 'The field path that failed validation',
  })
  field: string;

  @ApiProperty({
    example: 'Goal name is required',
    description: 'Human-readable error message',
  })
  message: string;

  @ApiProperty({
    example: 'isNotEmpty',
    description: 'Validation constraint that was violated',
  })
  constraint?: string;

  @ApiProperty({
    example: ['value1', 'value2'],
    description: 'Values that failed validation (for array/object errors)',
    required: false,
  })
  values?: unknown[];
}

export class ValidationErrorDto extends ApiErrorResponseDto {
  @ApiProperty({
    example: [
      {
        field: 'goalName',
        message: 'Goal name is required',
        constraint: 'isNotEmpty',
      },
      {
        field: 'targetAmount',
        message: 'Target amount must be at least 0.01 XLM',
        constraint: 'min',
      },
    ],
    description: 'Array of validation errors with field paths and constraints',
    type: [ValidationErrorItem],
  })
  errors?: ValidationErrorItem[];
}

export class RateLimitErrorDto extends ApiErrorResponseDto {
  @ApiProperty({
    example: 429,
    description: 'HTTP status code',
  })
  statusCode = 429;

  @ApiProperty({
    example: 'Too Many Requests',
    description: 'Error message',
  })
  message = 'Too Many Requests';

  @ApiProperty({
    example: 60,
    description: 'Maximum requests allowed in the time window',
  })
  retryAfter: number;

  @ApiProperty({
    example: '2026-03-30T05:00:00.000Z',
    description: 'ISO timestamp when the rate limit resets',
  })
  resetTime: string;

  @ApiProperty({
    example: '/savings/my-subscriptions',
    description: 'The endpoint that was rate limited',
  })
  endpoint: string;

  @ApiProperty({
    example: 'rpc',
    description: 'Rate limit tier (auth, rpc, default)',
  })
  rateLimitTier?: string;
}

export class UnauthorizedErrorDto extends ApiErrorResponseDto {
  @ApiProperty({
    example: 401,
    description: 'HTTP status code',
  })
  statusCode = 401;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Error message',
  })
  message = 'Unauthorized';
}

export class ForbiddenErrorDto extends ApiErrorResponseDto {
  @ApiProperty({
    example: 403,
    description: 'HTTP status code',
  })
  statusCode = 403;

  @ApiProperty({
    example: 'Forbidden',
    description: 'Error message',
  })
  message = 'Forbidden';
}

export class NotFoundErrorDto extends ApiErrorResponseDto {
  @ApiProperty({
    example: 404,
    description: 'HTTP status code',
  })
  statusCode = 404;

  @ApiProperty({
    example: 'Not Found',
    description: 'Error message',
  })
  message = 'Not Found';
}
