import { IsUUID, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsStellarPublicKey } from '../../../common/validators/is-stellar-key.validator';

export class SubscribeDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Savings product UUID to subscribe to',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 5000,
    description: 'Amount to subscribe (in XLM)',
  })
  @IsNumber()
  @Min(0.01, { message: 'Subscription amount must be at least 0.01 XLM' })
  amount: number;

  @ApiPropertyOptional({
    example: 'GABCDEF234567ABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHJKLMN',
    description:
      'Optional Stellar wallet address associated with this subscription',
  })
  @IsOptional()
  @IsStellarPublicKey()
  walletAddress?: string;
}
