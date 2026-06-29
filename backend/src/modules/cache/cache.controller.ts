import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CacheStrategyService } from './cache-strategy.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Cache')
@Controller('cache')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CacheController {
  constructor(private readonly cacheStrategy: CacheStrategyService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get cache hit/miss ratio and eviction counts' })
  @ApiResponse({
    status: 200,
    description: 'Cache metrics including hit rate, miss rate, and evictions',
    schema: {
      example: {
        hits: 1250,
        misses: 350,
        sets: 500,
        deletes: 25,
        evictions: 10,
        hitRate: '78.13%',
        missRate: '21.88%',
        totalRequests: 1600,
      },
    },
  })
  getMetrics() {
    return this.cacheStrategy.getMetrics();
  }

  @Get('reset-metrics')
  @ApiOperation({ summary: 'Reset cache metrics to zero' })
  @ApiResponse({ status: 200, description: 'Metrics reset successfully' })
  resetMetrics() {
    this.cacheStrategy.resetMetrics();
    return { message: 'Cache metrics reset' };
  }
}
