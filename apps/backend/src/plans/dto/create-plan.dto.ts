import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsNumber,
} from 'class-validator';
export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  durationDays: number;

  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  description?: string;
}