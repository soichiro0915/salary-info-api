import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { Term } from '@prisma/client';

@Injectable()
export class TermService {
  constructor(private prisma: PrismaService) {}

  getTerms(userId: number): Promise<Term[]> {
    return this.prisma.term.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getTermById(userId: number, termId: number): Promise<Term> {
    return this.prisma.term.findFirst({
      where: {
        userId,
        id: termId,
      },
    });
  }

  async createTerm(userId: number, dto: CreateTermDto): Promise<Term> {
    console.log(dto);
    const term = await this.prisma.term.create({
      data: {
        userId,
        year: Number(dto.year),
        month: Number(dto.month),
      },
    });

    return term;
  }

  async updateTermById(
    userId: number,
    termId: number,
    dto: UpdateTermDto,
  ): Promise<Term> {
    const term = await this.prisma.term.findUnique({
      where: {
        id: termId,
      },
    });

    if (!term || term.userId !== userId) {
      throw new ForbiddenException('No permission to update');
    }

    // 文字列型数値なら数値に変換する
    const data = {};
    for (const [key, value] of Object.entries(dto)) {
      data[key] = Number.isNaN(value) ? value : Number(value);
    }
    return await this.prisma.term.update({
      where: {
        id: termId,
      },
      data: {
        ...data,
      },
    });
  }

  async deleteTermById(userId: number, termId: number): Promise<void> {
    const term = await this.prisma.term.findUnique({
      where: {
        id: termId,
      },
    });

    if (!term || term.userId !== userId) {
      throw new ForbiddenException('No permission to delete');
    }

    await this.prisma.term.delete({
      where: {
        id: termId,
      },
    });
  }
}
