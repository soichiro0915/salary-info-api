import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SalaryInfoController } from './salary-info.controller';
import { SalaryInfoService } from './salary-info.service';

@Module({
  imports: [PrismaModule],
  controllers: [SalaryInfoController],
  providers: [SalaryInfoService],
})
export class SalaryInfoModule {}
