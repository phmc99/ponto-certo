import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { EmployeeService } from 'src/modules/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { IsAdminMiddleware } from './isAdmin.middleware';

@Module({
  providers: [IsAdminMiddleware, EmployeeService, PrismaService, JwtService],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsAdminMiddleware)
      .forRoutes(
        { path: 'sector', method: RequestMethod.ALL },
        { path: 'sector/*', method: RequestMethod.ALL },
        { path: 'employee', method: RequestMethod.POST },
        'clockin/record/daily',
      );
  }
}
