import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChambresService } from './chambres.service';
import { CreateChambreDto } from './dto/create-chambre.dto';
import { UpdateChambreDto } from './dto/update-chambre.dto';

@Controller('chambres')
export class ChambresController {
  constructor(private readonly chambresService: ChambresService) {}

  @Post()
  create(@Body() createChambreDto: CreateChambreDto) {
    return this.chambresService.create(createChambreDto);
  }

  @Get()
  findAll() {
    return this.chambresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chambresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChambreDto: UpdateChambreDto) {
    return this.chambresService.update(+id, updateChambreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chambresService.remove(+id);
  }
}
