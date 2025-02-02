import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ChambresService } from './chambres.service';
import { CreateChambreDto } from './dto/create-chambre.dto';
import { UpdateChambreDto } from './dto/update-chambre.dto';

@Controller('chambres')
export class ChambresController {
  constructor(private readonly chambresService: ChambresService) {}

  @Post()
  async create(@Body() createChambreDto: CreateChambreDto) {
    return await this.chambresService.create(createChambreDto);
  }

  @Get()
  async findAll() {
    return await this.chambresService.findAll();
  }

  @Get(':numero')
  async findOne(@Param('numero') numero: number) {
    const chambre = await this.chambresService.findOne(+numero);
    if (!chambre) {
      throw new NotFoundException(`Chambre with numero ${numero} not found`);
    }
    return chambre;
  }

  @Patch(':numero')
  async update(
    @Param('numero') numero: number,
    @Body() updateChambreDto: UpdateChambreDto,
  ) {
    return await this.chambresService.update(+numero, updateChambreDto);
  }

  @Delete(':numero')
  async remove(@Param('numero') numero: number) {
    return await this.chambresService.remove(+numero);
  }
}
