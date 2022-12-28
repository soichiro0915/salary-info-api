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
import { TermService } from './term.service';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { Term } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('term')
export class TermController {
  constructor(private termService: TermService) {}

  @Get()
  getTerms(@Req() req: Request): Promise<Term[]> {
    return this.termService.getTerms(req.user.id);
  }

  @Get(':id')
  getTermById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) termId: number,
  ): Promise<Term> {
    return this.termService.getTermById(req.user.id, termId);
  }

  @Post()
  createTerm(@Req() req: Request, @Body() dto: CreateTermDto): Promise<Term> {
    return this.termService.createTerm(req.user.id, dto);
  }

  @Patch(':id')
  updateTermById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) termId: number,
    @Body() dto: UpdateTermDto,
  ): Promise<Term> {
    return this.termService.updateTermById(req.user.id, termId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTermById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) termId: number,
  ): Promise<void> {
    return this.termService.deleteTermById(req.user.id, termId);
  }
}
