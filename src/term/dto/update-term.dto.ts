import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateTermDto {
  @IsNumberString()
  @IsNotEmpty()
  year: number;
}
