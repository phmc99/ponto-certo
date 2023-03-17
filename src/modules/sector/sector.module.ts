import { Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorController } from './sector.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [SectorController],
  providers: [SectorService, PrismaService],
})
export class SectorModule {}
