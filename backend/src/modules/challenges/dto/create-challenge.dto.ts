import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateChallengeDto {
  @ApiProperty({
    example: 'Save $10,000 in 3 months',
    description: 'Challenge title',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    example: 'Build your emergency fund with consistent daily savings',
    description: 'Challenge description',
  })
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty({
    example: 10000,
    description: 'Target amount to save',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  targetAmount: number;

  @ApiProperty({
    example: '2026-07-01T00:00:00.000Z',
    description: 'Challenge start date (ISO 8601)',
  })
  @IsDateString()
  startsAt: string;

  @ApiProperty({
    example: '2026-09-30T23:59:59.000Z',
    description: 'Challenge end date (ISO 8601)',
  })
  @IsDateString()
  endsAt: string;

  @ApiPropertyOptional({
    example: 'Savings Champion',
    description: 'Badge name awarded upon completion',
  })
  @IsOptional()
  @IsString()
  badgeName?: string;
}
