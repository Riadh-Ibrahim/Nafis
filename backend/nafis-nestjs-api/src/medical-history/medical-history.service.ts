/* eslint-disable prettier/prettier */
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { Repository } from 'typeorm';
import { DocumentsService } from 'src/documents/documents.service';
import { ConsultationsService } from 'src/consultations/consultations.service';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { PatientsService } from 'src/patients/patients.service';
import { UpdateDocumentDto } from 'src/documents/dto/update-document.dto';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private readonly medicalHistoryRepository: Repository<MedicalHistory>,
   
    @Inject(forwardRef(() => DocumentsService))
    private readonly documentService: DocumentsService,
    @Inject(forwardRef(() => ConsultationsService))
    private readonly consultationService: ConsultationsService,
    @Inject(forwardRef(() => PatientsService))
    private readonly patientService: PatientsService,
  ) {}

  async createMedicalHistory(
    patientId: number, 
    createMedicalHistoryDto: CreateMedicalHistoryDto) {
      const patient = await this.patientService.findOne(patientId);

      if (!patient) {
        throw new NotFoundException("Cannot find the patient");
      }

      const { consultations, documents } = createMedicalHistoryDto;

      if (!consultations && !documents) {
        throw new BadRequestException("At least one document or one consultation is required to create medical history");
      }

      const createDocumentEntities = documents && documents.length > 0  
      ? await Promise.all(documents.map(async (documentDto) => {
        const doc = await this.documentService.create(patientId, documentDto)
        console.log(`doc: ${doc}`)
        return doc;
      }))
      : [];

      const createConsultationsEntities = consultations && consultations.length > 0  
      ? await Promise.all(consultations.map(async (consultationDto) => {
        const consultation = await this.consultationService.create(consultationDto)
        console.log(`doc: ${consultation}`)
        return consultation;
      }))
      : [];
      
      const medicalHistory = this.medicalHistoryRepository.create({
        patient,
        consultations: createConsultationsEntities,
        documents: createDocumentEntities,
      })

  
      console.log(`documeents : ${createDocumentEntities}`)
      return await this.medicalHistoryRepository.save(medicalHistory);
  }
  
  async getMedicalHistory(patientId: number) {
    const patient = await this.patientService.findOne(patientId);

    if (!patient) {
      throw new NotFoundException("Couldn't find the patient");
    }

    const medicalHistory = await this.medicalHistoryRepository.findOne({where: {patient: { id: patientId }}});
    return medicalHistory;
  }

  async getAllDocuments(patientId: number) {
    const medicalHistory = await this.medicalHistoryRepository.findOne({
      where: { patient: { id: patientId } },
      relations: ['documents'],
    });

    if (!medicalHistory) {
      throw new NotFoundException('Medical history not found for the patient');
    }

    return medicalHistory.documents;
  }

  async addDocument(
    patientId: number, 
    createDocumentDto,
  ) {
    const patient = await this.patientService.findOne(patientId);

  if (!patient) {
    throw new NotFoundException('Patient not found');
  }
  const document = this.documentService.create(patientId, createDocumentDto);
  return document;
  }
  
  async updateDocument(docId: number, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.documentService.update(docId, updateDocumentDto);
  
    if (!document) {
      throw new NotFoundException('Document not found');
    }
  
    return document;
  }
  
  async removeDocument(documentId: number) {
    const document = await this.documentService.remove(documentId);
  
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    
    return { message: 'Document removed successfully' };
  }
}
