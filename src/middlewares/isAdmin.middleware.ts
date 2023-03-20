import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from 'src/modules/employee/employee.service';

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const [, token] = req.headers.authorization?.split(' ');

    if (token == null) {
      throw new Error('Invalid authorization header');
    }

    const { cpf }: any = this.jwtService.decode(token);

    console.log(cpf);

    const employee = await this.employeeService.findByCpf(cpf);

    if (!employee.isAdmin) {
      throw new Error('Unauthorized');
    }

    next();
  }
}
