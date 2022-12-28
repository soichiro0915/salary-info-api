import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TermController } from './term.controller';
import { TermService } from './term.service';

@Module({
  imports: [PrismaModule],
  controllers: [TermController],
  providers: [TermService],
})
export class TermModule {}
