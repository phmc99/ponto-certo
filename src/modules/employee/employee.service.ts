import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.email = createEmployeeDto.email.toLowerCase();
    const employeeExists = await this.prisma.employee.findFirst({
      where: {
        name: createEmployeeDto.email,
      },
    });

    if (employeeExists) {
      throw new Error('Employee already exists');
    }

    const employee = await this.prisma.employee.create({
      data: createEmployeeDto,
    });

    return employee;
  }

  async findAll() {
    const employees = await this.prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        sector: {
          select: {
            name: true,
          },
        },
      },
    });
    return employees;
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        sector: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    updateEmployeeDto.email = updateEmployeeDto.email.toLowerCase();
    const employeeExists = await this.prisma.employee.findFirst({
      where: {
        name: updateEmployeeDto.email,
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
