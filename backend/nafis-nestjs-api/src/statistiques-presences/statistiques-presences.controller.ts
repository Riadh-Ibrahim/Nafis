import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatistiquesPresencesService } from './statistiques-presences.service';
import { CreateStatistiquesPresenceDto } from './dto/create-statistiques-presence.dto';
import { UpdateStatistiquesPresenceDto } from './dto/update-statistiques-presence.dto';

@Controller('statistiques-presences')
export class StatistiquesPresencesController {
  constructor(private readonly statistiquesPresencesService: StatistiquesPresencesService) {}

  @Post()
  create(@Body() createStatistiquesPresenceDto: CreateStatistiquesPresenceDto) {
    return this.statistiquesPresencesService.create(createStatistiquesPresenceDto);
  }

  @Get()
  findAll() {
    return this.statistiquesPresencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statistiquesPresencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatistiquesPresenceDto: UpdateStatistiquesPresenceDto) {
    return this.statistiquesPresencesService.update(+id, updateStatistiquesPresenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statistiquesPresencesService.remove(+id);
  }
}
