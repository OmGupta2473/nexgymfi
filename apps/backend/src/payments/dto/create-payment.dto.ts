import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  PaymentMethod,
  PaymentType,
} from '../../../generated/prisma/enums';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  memberId!: string;

  @IsOptional()
  @IsString()
  membershipId?: string;

  @IsNumber()
  amount!: number;

  @IsEnum(PaymentType)
  type!: PaymentType;

  @IsEnum(PaymentMethod)
  method!: PaymentMethod;

  @IsOptional()
  @IsString()
  notes?: string;
}