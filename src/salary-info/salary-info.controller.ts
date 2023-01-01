import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SalaryInfoService } from './salary-info.service';
import { CreateSalaryInfoDto } from './dto/create-salary-info.dto';
import { UpdateSalaryInfoDto } from './dto/update-salary-info.dto';
import { SalaryInfo } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('salary-info')
export class SalaryInfoController {
  constructor(private salaryInfoService: SalaryInfoService) {}

  @Get()
  getSalaryInfos(@Req() req: Request): Promise<SalaryInfo[]> {
    return this.salaryInfoService.getSalaryInfos(req.user.id);
  }

  @Get(':id')
  getSalaryInfoById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) salaryInfoId: number,
  ): Promise<SalaryInfo> {
    return this.salaryInfoService.getSalaryInfoById(req.user.id, salaryInfoId);
  }

  @Post(':id')
  createSalaryInfo(
    @Req() req: Request,
    @Param('id', ParseIntPipe) termId: number,
    @Body() dto: CreateSalaryInfoDto,
  ): Promise<SalaryInfo> {
    return this.salaryInfoService.createSalaryInfo(req.user.id, termId, dto);
  }

  @Patch(':id')
  updateSalaryInfoById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) salaryInfoId: number,
    @Body() dto: UpdateSalaryInfoDto,
  ): Promise<SalaryInfo> {
    return this.salaryInfoService.updateSalaryInfoById(
      req.user.id,
      salaryInfoId,
      dto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSalaryInfoById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) salaryInfoId: number,
  ): Promise<void> {
    return this.salaryInfoService.deleteSalaryInfoById(
      req.user.id,
      salaryInfoId,
    );
  }
}
