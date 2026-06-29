import { IsUUID, IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WithdrawDto {
  @ApiProperty({
    example: 'sub-123456',
    description: 'Subscription ID to withdraw from',
  })
  @IsUUID()
  subscriptionId: string;

  @ApiProperty({
    example: 1000.5,
    description: 'Amount to withdraw (in XLM)',
    minimum: 0.01,
  })
  @IsNumber()
  @Min(0.01, { message: 'Withdrawal amount must be at least 0.01 XLM' })
  amount: number;

  @ApiPropertyOptional({
    example: 'emergency',
    description: 'Optional reason for withdrawal',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
