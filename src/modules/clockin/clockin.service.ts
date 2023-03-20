import { Injectable } from '@nestjs/common';
import { CreateClockinDto } from './dto/create-clockin.dto';
import { PrismaService } from '../../database/PrismaService';
import { UpdateClockinDto } from './dto/update-clockin.dto';
import { paginate } from 'src/utils/paginate';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import { csvWrite } from 'src/utils/csvWrite';

@Injectable()
export class ClockinService {
  constructor(private prisma: PrismaService, private mailer: MailerService) {}

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

  async findAll(page = 1, perPage: number) {
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
    return paginate(clockIns, page, perPage);
  }

  async findAllByEmployee(employeeId: string, page = 1, perPage: number) {
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
    return paginate(clockIns, page, perPage);
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

  async generateDailyRecord(receiver: string | string[]) {
    const clockIns = await this.prisma.clockIn.findMany({
      select: {
        date: true,
        updateDate: true,
        updateMessage: true,
        type: true,
        employee: {
          select: {
            name: true,
            cpf: true,
            sector: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const dailyClockins = clockIns.filter((item) => {
      const nowDay = new Date().getDay();
      const itemDay = new Date(item.date).getDay();

      if (itemDay === nowDay) {
        return item;
      }
    });

    const mapClockins = dailyClockins.map((item) => ({
      name: item.employee.name,
      cpf: item.employee.cpf,
      sector: item.employee.sector.name,
      type: item.type,
      date: item.date,
      updateDate: item.updateDate,
      updateMessage: item.updateMessage,
    }));

    await csvWrite(mapClockins);

    const conteudoDoArquivo = fs.readFileSync('./src/utils/temp/data.csv');

    await this.mailer.sendMail({
      to: receiver,
      subject: 'Relatorio de pontos',
      html: 'Marcação de pontos de todos os funcionarios',
      attachments: [
        {
          filename: 'data.csv',
          content: conteudoDoArquivo,
        },
      ],
    });

    return mapClockins;
  }
}
