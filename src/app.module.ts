import { Module } from '@nestjs/common';
import { SectorModule } from './modules/sector/sector.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ClockinModule } from './modules/clockin/clockin.module';

@Module({
  imports: [SectorModule, EmployeeModule, ClockinModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
