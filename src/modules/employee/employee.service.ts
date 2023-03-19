import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { paginate } from 'src/utils/paginate';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import hashPasswordHook from './helpers/hash';
import { isValidCpf } from './helpers/validateCpf';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    if (!isValidCpf(createEmployeeDto.cpf)) {
      throw new Error('Invalid CPF');
    }

    const employeeExists = await this.prisma.employee.findFirst({
      where: {
        name: createEmployeeDto.cpf,
      },
    });

    if (employeeExists) {
      throw new Error('Employee already exists');
    }

    const data = await hashPasswordHook({ ...createEmployeeDto });

    const employee = await this.prisma.employee.create({
      data,
      select: {
        id: true,
        name: true,
        sector: {
          select: {
            name: true,
          },
        },
      },
    });

    return employee;
  }

  async findAll(page = 1, perPage: number) {
    const employees = await this.prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        sector: {
          select: {
            name: true,
          },
        },
      },
    });
    return paginate(employees, page, perPage);
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        cpf: true,
        sector: {
          select: {
            name: true,
          },
        },
        clockIn: true,
      },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    updateEmployeeDto.cpf = updateEmployeeDto.cpf.toLowerCase();
    const employeeExists = await this.prisma.employee.findFirst({
      where: {
        name: updateEmployeeDto.cpf,
      },
    });

    if (employeeExists) {
      throw new Error('Email already in use');
    }

    const employee = await this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return { ...employee, status: 'updated' };
  }

  async remove(id: string) {
    const employee = await this.prisma.employee.delete({
      where: { id },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return { ...employee, status: 'deleted' };
  }
}
