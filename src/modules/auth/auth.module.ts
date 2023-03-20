import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeService } from '../employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/PrismaService';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    EmployeeService,
    JwtService,
    JwtStrategy,
    LocalStrategy,
    PrismaService,
  ],
})
export class AuthModule {}
