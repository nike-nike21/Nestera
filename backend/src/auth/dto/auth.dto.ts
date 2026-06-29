import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsStellarPublicKey } from '../../common/validators/is-stellar-key.validator';

export class RegisterDto {
  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'supersecret123' })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @ApiProperty({ example: 'Alice', required: false })
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'ABC12345',
    description: 'Referral code from another user',
  })
  @IsOptional()
  @IsString()
  referralCode?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'supersecret123' })
  @IsString()
  password: string;
}

export class GetNonceDto {
  @ApiProperty({
    example: 'GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUV',
    description: 'Stellar public key to get nonce for',
  })
  @IsStellarPublicKey()
  publicKey: string;
}

export class VerifySignatureDto {
  @ApiProperty({
    example: 'GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUV',
    description: 'Stellar public key to verify signature for',
  })
  @IsStellarPublicKey()
  publicKey: string;

  @ApiProperty({
    example: '304402206b1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    description: 'Hex-encoded Ed25519 signature over the nonce',
  })
  @IsString()
  signature: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'The nonce returned by GET /auth/nonce',
  })
  @IsString()
  nonce: string;
}

/**
 * Body accepted by POST /auth/link-wallet.
 * The caller must:
 *  1. Fetch a nonce via GET /auth/nonce?publicKey=<key>
 *  2. Sign the nonce bytes with the wallet's Ed25519 secret key
 *  3. Submit this DTO together with a valid JWT (Bearer token)
 */
export class LinkWalletDto {
  @ApiProperty({
    example: 'GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUV',
    description: 'Stellar G... public key to link to the authenticated account',
  })
  @IsStellarPublicKey()
  publicKey: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'The nonce returned by GET /auth/nonce?publicKey=<key>',
  })
  @IsString()
  nonce: string;

  @ApiProperty({
    example: '304402206b1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    description: 'Hex-encoded Ed25519 signature of the nonce bytes',
  })
  @IsString()
  signature: string;
}