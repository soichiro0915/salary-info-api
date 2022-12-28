import { IsNotEmpty, IsOptional, IsNumberString } from 'class-validator';

export class CreateTermDto {
  @IsNumberString()
  @IsNotEmpty()
  year: number;

  @IsNumberString()
  @IsOptional()
  month: number;
}
