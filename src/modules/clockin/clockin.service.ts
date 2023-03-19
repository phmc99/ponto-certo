import { Injectable } from '@nestjs/common';
import { CreateClockinDto } from './dto/create-clockin.dto';
import { PrismaService } from '../../database/PrismaService';
import { UpdateClockinDto } from './dto/update-clockin.dto';

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
        id: true,
        employee: {
          select: {
            id: true,
            name: true,
            sector: { select: { name: true } },
          },
        },
        date: true,
        updateDate: true,
        updateMessage: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
    return clockIns;
  }

  async findAllByEmployee(employeeId: string) {
    const clockIns = await this.prisma.clockIn.findMany({
      where: { employeeId },
      select: {
        id: true,
        employee: {
          select: {
            id: true,
            name: true,
            sector: { select: { name: true } },
          },
        },
        date: true,
        updateDate: true,
        updateMessage: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
    return clockIns;
  }

  async update(id: string, updateClockinDto: UpdateClockinDto) {
    const clockIn = await this.prisma.clockIn.update({
      where: { id },
      data: updateClockinDto,
    });

    if (!clockIn) {
      throw new Error('Employee not found');
    }

    return { ...clockIn, status: 'updated' };
  }
}
