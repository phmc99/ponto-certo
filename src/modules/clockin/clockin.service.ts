import { Injectable } from '@nestjs/common';
import { CreateClockinDto } from './dto/create-clockin.dto';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class ClockinService {
  constructor(private prisma: PrismaService) {}

  async create(createClockinDto: CreateClockinDto) {
    const employee = await this.prisma.employee.findFirst({
      where: { id: createClockinDto.employeeId },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }
    const clockIn = await this.prisma.clockIn.create({
      data: createClockinDto,
    });

    return clockIn;
  }

  async findAll() {
    const clockIns = await this.prisma.clockIn.findMany({
      select: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            sector: { select: { name: true } },
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
    return clockIns;
  }
}
