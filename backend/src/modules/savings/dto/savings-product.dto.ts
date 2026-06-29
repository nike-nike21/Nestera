import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SavingsProductType,
  RiskLevel,
} from '../entities/savings-product.entity';

export class SavingsProductDto {
  @ApiProperty({ example: 'prod-123456', description: 'Product UUID' })
  id: string;

  @ApiProperty({ example: 'Flexi Savings', description: 'Product name' })
  name: string;

  @ApiProperty({ enum: SavingsProductType, example: SavingsProductType.FLEXI, description: 'Product type' })
  type: SavingsProductType;

  @ApiPropertyOptional({ example: 'Flexible savings with no lock period', description: 'Product description' })
  description: string | null;

  @ApiProperty({ example: 8.5, description: 'Annual interest rate (%)' })
  interestRate: number;

  @ApiProperty({ example: 10, description: 'Minimum subscription amount' })
  minAmount: number;

  @ApiProperty({ example: 100000, description: 'Maximum subscription amount' })
  maxAmount: number;

  @ApiPropertyOptional({ example: 3, description: 'Tenure in months' })
  tenureMonths: number | null;

  @ApiPropertyOptional({ example: 'CAENV...contract-id', description: 'Soroban vault contract ID' })
  contractId: string | null;

  @ApiProperty({ example: true, description: 'Whether product is active' })
  isActive: boolean;

  @ApiPropertyOptional({ example: 5, description: 'Maximum active subscriptions allowed per user' })
  maxSubscriptionsPerUser: number | null;

  @ApiProperty({ example: 1, description: 'Current product version' })
  version: number;

  @ApiProperty({
    description: 'Risk level classification (e.g. Low, Medium, High)',
    enum: RiskLevel,
    example: RiskLevel.LOW,
  })
  riskLevel: RiskLevel;

  @ApiProperty({ example: 5000000, description: 'Total Value Locked (aggregated local balance)' })
  tvlAmount: number;

  @ApiPropertyOptional({ example: 10000000, description: 'Maximum liquidity-backed capacity for the product' })
  maxCapacity: number | null;

  @ApiProperty({ example: 2500000, description: 'Current utilized capacity amount' })
  utilizedCapacity: number;

  @ApiProperty({ example: 7500000, description: 'Remaining capacity amount' })
  availableCapacity: number;

  @ApiProperty({ example: 50, description: 'Capacity utilization percentage' })
  utilizationPercentage: number;

  @ApiProperty({ example: '2026-01-15T10:30:00.000Z', description: 'Product creation timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2026-01-20T14:45:00.000Z', description: 'Product last update timestamp' })
  updatedAt: Date;
}
