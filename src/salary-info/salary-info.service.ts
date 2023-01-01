import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaryInfoDto } from './dto/create-salary-info.dto';
import { UpdateSalaryInfoDto } from './dto/update-salary-info.dto';
import { SalaryInfo } from '@prisma/client';

@Injectable()
export class SalaryInfoService {
  constructor(private prisma: PrismaService) {}

  getSalaryInfos(userId: number): Promise<SalaryInfo[]> {
    return this.prisma.salaryInfo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getSalaryInfoById(userId: number, salaryInfoId: number): Promise<SalaryInfo> {
    return this.prisma.salaryInfo.findFirst({
      where: {
        userId,
        id: salaryInfoId,
      },
    });
  }

  async createSalaryInfo(
    userId: number,
    termId: number,
    dto: CreateSalaryInfoDto,
  ): Promise<SalaryInfo> {
    const salaryInfo = await this.prisma.salaryInfo.create({
      data: {
        userId,
        termId,
        month: Number(dto.month),
        ...change_stringNumber_to_number(dto),
      },
    });

    return salaryInfo;
  }

  async createSalaryInfos(userId: number, termId: number): Promise<void> {
    const salaryInfos = await this.prisma.salaryInfo.createMany({
      data: [...Array(12)]
        .map((_, i) => i + 1)
        .map((month) => ({
          userId,
          termId,
          month: Number(month),
        })),
    });
  }

  async updateSalaryInfoById(
    userId: number,
    salaryInfoId: number,
    dto: UpdateSalaryInfoDto,
  ): Promise<SalaryInfo> {
    const salaryInfo = await this.prisma.salaryInfo.findUnique({
      where: {
        id: salaryInfoId,
      },
    });

    if (!salaryInfo || salaryInfo.userId !== userId) {
      throw new ForbiddenException('No permission to update');
    }

    return await this.prisma.salaryInfo.update({
      where: {
        id: salaryInfoId,
      },
      data: {
        ...change_stringNumber_to_number(dto),
      },
    });
  }

  async deleteSalaryInfoById(userId: number, salaryInfoId: number) {
    const salaryInfo = await this.prisma.salaryInfo.findUnique({
      where: {
        id: salaryInfoId,
      },
    });

    if (!salaryInfo || salaryInfo.userId !== userId) {
      throw new ForbiddenException('No permission to delete');
    }

    await this.prisma.salaryInfo.delete({
      where: {
        id: salaryInfoId,
      },
    });
  }
}

// 文字列の数字を数値に変換する関数
const change_stringNumber_to_number = (obj) => {
  const data = {};
  for (const [key, value] of Object.entries(obj)) {
    data[key] = Number.isNaN(value) ? value : Number(value);
  }
  return data;
};
