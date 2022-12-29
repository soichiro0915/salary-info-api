import { IsNotEmpty, IsOptional, IsNumberString } from 'class-validator';

export class CreateSalaryInfoDto {
  @IsNumberString()
  @IsNotEmpty()
  month: number;

  @IsNumberString()
  @IsOptional()
  basicSalary: number;

  @IsNumberString()
  @IsOptional()
  overtimePay: number;

  @IsNumberString()
  @IsOptional()
  allowances: number;

  @IsNumberString()
  @IsOptional()
  bonus: number;

  @IsNumberString()
  @IsOptional()
  otherSalary: number;

  @IsNumberString()
  @IsOptional()
  incomeTax: number;

  @IsNumberString()
  @IsOptional()
  residentTax: number;

  @IsNumberString()
  @IsOptional()
  healthInsurancePremium: number;

  @IsNumberString()
  @IsOptional()
  annuityPrice: number;

  @IsNumberString()
  @IsOptional()
  employmentInsurancePremium: number;

  @IsNumberString()
  @IsOptional()
  federalLawPermits: number;

  @IsNumberString()
  @IsOptional()
  otherDeduction: number;
}
