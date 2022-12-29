import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateTermDto {
  @IsNumberString()
  @IsNotEmpty()
  year: number;
}
