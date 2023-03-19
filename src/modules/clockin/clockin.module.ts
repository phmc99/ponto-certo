import { Module } from '@nestjs/common';
import { ClockinService } from './clockin.service';
import { ClockinController } from './clockin.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [ClockinController],
  providers: [ClockinService, PrismaService],
})
export class ClockinModule {}
