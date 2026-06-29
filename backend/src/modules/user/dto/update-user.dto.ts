import { IsOptional, IsString, MaxLength, IsNotEmpty, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Alice Johnson',
    description: 'User display name',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name?: string;

  @ApiPropertyOptional({
    example: 'Saving for my dream vacation!',
    description: 'User biography',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Bio must not exceed 500 characters' })
  bio?: string;
}

export class ApproveKycDto {
  @ApiPropertyOptional({
    example: 'user-123',
    description: 'User UUID to approve KYC for',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class RejectKycDto {
  @ApiPropertyOptional({
    example: 'user-123',
    description: 'User UUID to reject KYC for',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({
    example: 'Document does not match user profile',
    description: 'Reason for rejection',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Reason must be at least 10 characters' })
  reason: string;
}
