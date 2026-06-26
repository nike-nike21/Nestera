import { IsUrl, IsArray, IsString, IsOptional } from 'class-validator';

export class CreateWebhookDto {
  @IsUrl()
  url: string;

  @IsArray()
  @IsString({ each: true })
  events: string[];

  @IsString()
  @IsOptional()
  secret?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
