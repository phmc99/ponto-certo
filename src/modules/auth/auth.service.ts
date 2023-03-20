import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async validateEmployee(cpf: string, password: string) {
    const employee = await this.employeeService.findByCpf(cpf);
    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      throw new Error('Invalid CPF or Password');
    }

    if (employee && isMatch) {
      return employee;
    }
    return null;
  }

  async login(employee: Employee) {
    const payload = {
      cpf: employee.cpf,
      sub: employee.id,
      isAdmin: employee.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_JWT,
      }),
    };
  }
}
