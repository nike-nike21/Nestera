import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum MetricsGranularity {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export class ProductMetricsQueryDto {
  @ApiPropertyOptional({
    enum: MetricsGranularity,
    default: MetricsGranularity.DAILY,
    description: 'Granularity of historical chart data',
    example: MetricsGranularity.DAILY,
  })
  @IsEnum(MetricsGranularity)
  @IsOptional()
  granularity?: MetricsGranularity = MetricsGranularity.DAILY;
}

export class ApyDataPointDto {
  @ApiProperty({ example: '2026-03-01', description: 'Date of the data point' })
  date: string;

  @ApiProperty({ example: 4.5, description: 'APY at this point (%)' })
  apy: number;
}

export class TvlDataPointDto {
  @ApiProperty({ example: '2026-03-01', description: 'Date of the data point' })
  date: string;

  @ApiProperty({ example: 125000, description: 'TVL at this point' })
  tvl: number;
}

export class RiskMetricsDto {
  @ApiProperty({
    example: 1.42,
    description: 'Sharpe ratio (risk-adjusted return)',
  })
  sharpeRatio: number;

  @ApiProperty({
    example: 0.85,
    description: 'Standard deviation of APY over the period (%)',
  })
  apyVolatility: number;

  @ApiProperty({ example: 4.5, description: 'Maximum APY observed (%)' })
  maxApy: number;

  @ApiProperty({ example: 3.8, description: 'Minimum APY observed (%)' })
  minApy: number;

  @ApiProperty({ example: 4.2, description: 'Average APY over the period (%)' })
  avgApy: number;
}

export class SimilarProductDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Product UUID',
  })
  id: string;

  @ApiProperty({
    example: 'Premium Fixed 12M',
    description: 'Product name',
  })
  name: string;

  @ApiProperty({
    example: 9.2,
    description: 'Current APY (%)',
  })
  apy: number;

  @ApiProperty({
    example: 850000,
    description: 'Current TVL',
  })
  tvl: number;

  @ApiProperty({
    example: 'MEDIUM',
    description: 'Risk level',
  })
  riskLevel: string;
}

export class ProductMetricsDto {
  @ApiProperty({
    example: 'prod-123456',
    description: 'Product UUID',
  })
  productId: string;

  @ApiProperty({
    example: 'Flexi Savings',
    description: 'Product name',
  })
  productName: string;

  @ApiProperty({
    example: 8.5,
    description: 'Current APY (%)',
  })
  currentApy: number;

  @ApiProperty({
    example: 5000000,
    description: 'Current TVL',
  })
  currentTvl: number;

  @ApiProperty({
    example: 1250,
    description: 'Total active subscribers',
  })
  totalSubscribers: number;

  @ApiProperty({
    description: 'User retention rate (active / total ever subscribed, 0-100)',
    example: 78.5,
  })
  retentionRate: number;

  @ApiProperty({
    type: [ApyDataPointDto],
    description: 'Historical APY chart data',
  })
  apyHistory: ApyDataPointDto[];

  @ApiProperty({
    type: [TvlDataPointDto],
    description: 'TVL growth over time',
  })
  tvlHistory: TvlDataPointDto[];

  @ApiProperty({ type: RiskMetricsDto, description: 'Risk-adjusted metrics' })
  riskMetrics: RiskMetricsDto;

  @ApiProperty({
    type: [SimilarProductDto],
    description: 'Similar products for comparison',
  })
  similarProducts: SimilarProductDto[];

  @ApiPropertyOptional({
    example: '2026-01-20T14:45:00.000Z',
    description: 'ISO timestamp when this response was cached',
  })
  cachedAt?: string;
}