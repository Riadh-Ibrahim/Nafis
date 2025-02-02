import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AlertesService } from './alerte.service';
import { Alerte } from './entities/alerte.entity';

@Controller('alertes')
export class AlertesController {
  constructor(private readonly alertesService: AlertesService) {}

  @Post()
  async create(@Body() alerteData: Partial<Alerte>): Promise<Alerte> {
    return this.alertesService.create(alerteData);
  }

  @Get()
  async findAll(): Promise<Alerte[]> {
    return this.alertesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Alerte> {
    return this.alertesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<Alerte>): Promise<Alerte> {
    return this.alertesService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.alertesService.remove(id);
  }
}
