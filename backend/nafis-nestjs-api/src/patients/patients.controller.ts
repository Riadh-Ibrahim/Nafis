import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { UpdatePatientDto } from './dto/update-patient.dto';

import { UseGuards } from '@nestjs/common';
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}


  @Get()
  async findAll() {
    return await this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.patientsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto) {
    return await this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.patientsService.remove(+id);
  }
  @Get(':patientId/historique')
  async findPatientHistory(@Param('patientId') patientId: number) {
    return await this.patientsService.findPatientHistory(patientId);
  }
}
