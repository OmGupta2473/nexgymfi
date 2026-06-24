import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SupabaseAuthDto {
  @IsString()
  @IsNotEmpty()
  accessToken!: string;

  @IsOptional()
  @IsString()
  gymName?: string;

  @IsOptional()
  @IsEmail()
  gymEmail?: string;

  @IsOptional()
  @IsString()
  ownerName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  openHours?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  openWeekdays?: string[];
}
