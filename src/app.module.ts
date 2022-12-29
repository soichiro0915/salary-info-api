import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TermModule } from './term/term.module';
import { PrismaModule } from './prisma/prisma.module';
import { SalaryInfoModule } from './salary-info/salary-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    TermModule,
    PrismaModule,
    SalaryInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
