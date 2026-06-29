import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class SnoozeAlertDto {
  @ApiProperty({
    example: 24,
    minimum: 1,
    maximum: 168,
    description: 'Number of hours to snooze alert (1-168 hours)',
  })
  @IsInt()
  @Min(1, { message: 'Snooze duration must be at least 1 hour' })
  @Max(168, { message: 'Snooze duration cannot exceed 168 hours (7 days)' })
  hours!: number;
}