import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
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
  findAll(@Query('page') page: string, @Query('perPage') perPage: string) {
    return this.clockinService.findAll(+page, +perPage);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClockinDto: UpdateClockinDto) {
    return this.clockinService.update(id, updateClockinDto);
  }

  @Get('/employee/:id')
  findAllByEmployee(
    @Param('id') id: string,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    return this.clockinService.findAllByEmployee(id, +page, +perPage);
  }
}
