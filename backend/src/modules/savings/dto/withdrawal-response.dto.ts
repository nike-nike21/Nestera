import { ApiProperty } from '@nestjs/swagger';

export class WithdrawalResponseDto {
  @ApiProperty({
    example: 'wd-123456',
    description: 'Withdrawal request ID',
  })
  withdrawalId: string;

  @ApiProperty({
    example: 1000.5,
    description: 'Requested withdrawal amount (in XLM)',
  })
  amount: number;

  @ApiProperty({
    example: 50.25,
    description: 'Early withdrawal penalty amount (in XLM)',
  })
  penalty: number;

  @ApiProperty({
    example: 950.25,
    description: 'Net amount after penalty deduction (in XLM)',
  })
  netAmount: number;

  @ApiProperty({
    example: 'pending',
    description: 'Withdrawal request status',
    enum: ['pending', 'processing', 'completed', 'failed'],
  })
  status: string;

  @ApiProperty({
    example: '2026-03-29T10:00:00Z',
    description: 'Estimated completion time (ISO 8601)',
  })
  estimatedCompletionTime: string;
}
