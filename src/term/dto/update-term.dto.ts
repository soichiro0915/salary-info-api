import { IsNotEmpty, IsOptional, IsNumberString } from 'class-validator';

export class UpdateTermDto {
  @IsNumberString()
  @IsNotEmpty()
  year: number;

  @IsNumberString()
  @IsOptional()
  month: number;
}
