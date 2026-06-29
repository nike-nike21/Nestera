import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { AlertType } from '../entities/product-alert.entity';

export class CreateAlertDto {
  @ApiProperty({
    enum: AlertType,
    example: AlertType.PRICE_THRESHOLD,
    description: 'Type of alert to create',
  })
  @IsEnum(AlertType)
  type!: AlertType;

  @ApiProperty({
    example: { threshold: 100, operator: 'gt' },
    description: 'Alert conditions object',
  })
  @IsObject()
  @IsNotEmpty()
  conditions!: Record<string, unknown>;

  @ApiPropertyOptional({
    example: 'price-alert-template',
    description: 'Optional template key',
  })
  @IsOptional()
  @IsString()
  template?: string;
}