import {
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMembershipDto {
  @IsString()
  @IsNotEmpty()
  memberId!: string;

  @IsString()
  @IsNotEmpty()
  planId!: string;

  @IsDateString()
  startDate!: string;
}