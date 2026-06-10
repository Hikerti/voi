import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

const trimString = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() || undefined : value;

export class CreateLeadDto {
  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @Transform(trimString)
  @IsString()
  @MaxLength(64)
  phone!: string;

  @Transform(trimString)
  @IsOptional()
  @IsEmail()
  @MaxLength(180)
  email?: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(3000)
  message?: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(180)
  source?: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(500)
  pageUrl?: string;

  @IsOptional()
  @IsBoolean()
  consent?: boolean;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(180)
  company?: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  startedAt?: string;
}
