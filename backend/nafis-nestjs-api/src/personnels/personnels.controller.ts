import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonnelsService } from './personnels.service';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { PresencesService } from 'src/presences/presences.service';
@Controller('personnels')
export class PersonnelsController {
  constructor(private readonly personnelsService: PersonnelsService,
    private readonly presencesService: PresencesService,  

  ) {}

  @Post()
  create(@Body() createPersonnelDto: CreatePersonnelDto) {
    return this.personnelsService.create(createPersonnelDto);
  }

  @Get()
  findAll() {
    return this.personnelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personnelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonnelDto: UpdatePersonnelDto) {
    return this.personnelsService.update(+id, updatePersonnelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personnelsService.remove(+id);
  }
  @Get(':id/presences')
  async getPersonnelPresences(@Param('id') id: number) {
    const personnel = await this.personnelsService.findOne(id);
    if (!personnel) {
      throw new Error('Personnel not found');
    }

    const presences = await this.presencesService.findByPersonnelId(id);

    // Calculate statistics
    const joursPresent = presences.filter(p => p.statut === 'PRESENT').length;
    const joursAbsent = presences.filter(p => p.statut === 'ABSENT').length;
    const joursConge = presences.filter(p => p.statut === 'CONGE').length;
    const joursMission = presences.filter(p => p.statut === 'MISSION').length;
    const totalJours = presences.length;
    const tauxPresence = totalJours ? (joursPresent / totalJours) * 100 : 0;

    const response = {
      personnelId: personnel.id,
      mois: new Date().toISOString().slice(0, 10),  
      joursPresent,
      joursAbsent,
      joursConge,
      joursMission,
      tauxPresence,
      presencesDetaillees: presences,
    };

    return response;
  }
}
