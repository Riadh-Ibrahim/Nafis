/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Param, Post, Put } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';

@Controller('patients/:id/historique')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

  @Post()
  async createMedicalHistory(
    @Param('id') patientId: number, 
    @Body() createMedicalHistoryDto: CreateMedicalHistoryDto) {
      return await this.medicalHistoryService.createMedicalHistory(
        patientId, 
        createMedicalHistoryDto);
    }

  @Get()
  async getMedicalHistory(@Param('id') patientId: number) {
    return this.medicalHistoryService.getMedicalHistory(patientId);
  }

  @Put()
  async updateMedicalHistory(
    @Param('id') patientId: number, 
    @Body() updateMedicalHistoryDto: UpdateMedicalHistoryDto) {
    return await this.updateMedicalHistory(
      patientId, updateMedicalHistoryDto
    );
  }
}
