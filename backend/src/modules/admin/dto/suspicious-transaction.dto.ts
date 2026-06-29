import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  TxStatus,
  TxType,
} from '../../transactions/entities/transaction.entity';

export class SuspiciousTransactionDto {
  @ApiProperty({ example: 'tx-123456' })
  id: string;

  @ApiProperty({ example: 'user-789' })
  userId: string;

  @ApiProperty({ enum: TxType, example: TxType.DEPOSIT })
  type: TxType;

  @ApiProperty({ example: '1000.50' })
  amount: string;

  @ApiPropertyOptional({ example: 'stellar-tx-hash-abc123' })
  txHash?: string | null;

  @ApiPropertyOptional({ enum: TxStatus })
  status?: TxStatus;

  @ApiPropertyOptional({ example: 'GABC123...' })
  publicKey: string | null;

  @ApiPropertyOptional({ example: 'evt-456' })
  eventId: string | null;

  @ApiPropertyOptional({ example: '12345678' })
  ledgerSequence: string | null;

  @ApiPropertyOptional({ example: 'pool-uuid-123' })
  poolId: string | null;

  @ApiPropertyOptional()
  metadata: Record<string, unknown> | null;

  @ApiProperty({ example: true })
  flagged: boolean;

  @ApiPropertyOptional({ example: 'SUSPICIOUS_AMOUNT' })
  category: string | null;

  @ApiProperty({ example: ['Large amount', 'Unusual pattern'] })
  tags: string[];

  @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: ['Amount exceeds threshold', 'New wallet address'] })
  reasons: string[];
}
