/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Param, Post, Put, Delete } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { CreateDocumentDto } from 'src/documents/dto/create-document.dto';
import { UpdateDocumentDto } from 'src/documents/dto/update-document.dto';

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

  @Get("/documents")
  async getAllDocuments(@Param("id") patientId: number) {
    return this.medicalHistoryService.getAllDocuments(patientId);
  }

  @Post("/documents")
  async addDocument(
    @Param('patientId') patientId: number,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    return this.medicalHistoryService.addDocument(
      patientId,
      createDocumentDto,
    );
  }

  @Put('/documents/:documentId')
  async updateDocument(
    @Param('patientId') patientId: number,
    @Param('documentId') documentId: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.medicalHistoryService.updateDocument(
      documentId,
      updateDocumentDto,
    );
  }

  @Delete('/documents/:documentId')
  async removeDocument(
    @Param('patientId') patientId: number,
    @Param('documentId') documentId: number,
  ) {
    return this.medicalHistoryService.removeDocument(
      documentId,
    );
  }
}
