import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationDays!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1) // Production-ready: Plans should generally cost at least 1 unit of currency
  price!: number;

  @IsOptional()
  @IsString()
  description?: string;
}