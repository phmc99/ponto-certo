import { Module } from '@nestjs/common';
import { SectorModule } from './modules/sector/sector.module';

@Module({
  imports: [SectorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
