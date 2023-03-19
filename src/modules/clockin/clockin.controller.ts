import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ClockinService } from './clockin.service';
import { CreateClockinDto } from './dto/create-clockin.dto';
import { UpdateClockinDto } from './dto/update-clockin.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClockinDto: UpdateClockinDto) {
    return this.clockinService.update(id, updateClockinDto);
  }

  @Get('/employee/:id')
  findAllByEmployee(@Param('id') id: string) {
    return this.clockinService.findAllByEmployee(id);
  }
}
