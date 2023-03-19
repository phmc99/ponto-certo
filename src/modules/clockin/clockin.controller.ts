import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClockinService } from './clockin.service';
import { CreateClockinDto } from './dto/create-clockin.dto';

@Controller('clockin')
export class ClockinController {
  constructor(private readonly clockinService: ClockinService) {}

  @Post()
  create(@Body() createClockinDto: CreateClockinDto) {
    return this.clockinService.create(createClockinDto);
  }

  @Get()
  findAll() {
    return this.clockinService.findAll();
  }
}
