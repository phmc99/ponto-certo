import { Module } from '@nestjs/common';
import { SectorModule } from './modules/sector/sector.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [SectorModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
