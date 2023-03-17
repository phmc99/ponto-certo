import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateSectorDto } from './dto/create-sector.dto';

@Injectable()
export class SectorService {
  constructor(private prisma: PrismaService) {}

  async create(createSectorDto: CreateSectorDto) {
    createSectorDto.name = createSectorDto.name.toLowerCase();

    const sectorExists = await this.prisma.sector.findFirst({
      where: {
        name: createSectorDto.name,
      },
    });

    if (sectorExists) {
      throw new Error('Sector already exists');
    }

    const sector = await this.prisma.sector.create({
      data: createSectorDto,
    });

    return sector;
  }

  async findAll() {
    const sectors = await this.prisma.sector.findMany();
    return sectors;
  }

  async remove(id: string) {
    const sector = await this.prisma.sector.delete({
      where: {
        id,
      },
    });

    return { ...sector, status: 'deleted' };
  }
}
