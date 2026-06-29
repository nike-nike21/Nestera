import { IsString, Matches, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LinkWalletDto {
  @ApiProperty({
    example: 'GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUV',
    description: 'Stellar public key (G...) - the wallet to link',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^G[A-Z2-7]{55}$/, { message: 'Invalid Stellar public key format' })
  address: string;

  @ApiProperty({
    example: '3044022000a1b2c3d4e5f...',
    description: 'Signed message proving wallet ownership',
  })
  @IsString()
  @IsNotEmpty()
  signature: string;

  @ApiProperty({
    example: 'Link wallet request for user 123',
    description: 'The message that was signed',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  message: string;
}
