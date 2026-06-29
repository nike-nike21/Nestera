import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddAdminNoteDto {
  @ApiProperty({
    example: 'User verified as legitimate after document review',
    description: 'Content of the admin note',
    minLength: 1,
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Note content is required' })
  @MaxLength(2000, { message: 'Note must not exceed 2000 characters' })
  content: string;
}
