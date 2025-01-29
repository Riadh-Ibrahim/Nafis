/* eslint-disable prettier/prettier */
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { Repository } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { DocumentsService } from 'src/documents/documents.service';
import { ConsultationsService } from 'src/consultations/consultations.service';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { PatientsService } from 'src/patients/patients.service';

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
      ? await Promise.all(documents.map((documentDto) => this.documentService.create(documentDto)))
      : [];

      const createConsultationsEntities = consultations && consultations.length > 0  
      ? await Promise.all(consultations.map((consultationDto) => this.consultationService.create(consultationDto)))
      : [];
      
      const medicalHistory = this.medicalHistoryRepository.create({
        patient,
        consultations: createConsultationsEntities,
        documents: createDocumentEntities,
      })

  

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

  async updateMedicalHistory(
    patientId: number, 
    updateMedicalHistoryDto: UpdateMedicalHistoryDto,
  ) {
    const medicalHistory = await this.medicalHistoryRepository
    .createQueryBuilder('medicalHistory')
    .leftJoinAndSelect('medicalHistory.patient', 'patient')
    .leftJoinAndSelect('medicalHistory.consultations', 'consultations')
    .leftJoinAndSelect('medicalHistory.documents', 'documents')
    .where('patient.id = :patientId', { patientId })
    .getOne();

    if (!medicalHistory) {
      throw new NotFoundException('Cannot load the medical history');
    }

    const { documents, consultations } = updateMedicalHistoryDto;

    if (documents) {
      await this.handleEntitiesUpdate(
        documents, 
        this.documentService.update, 
        this.documentService.create, 
        this.documentService.remove,
      )
    }

    if (consultations) {
      await this.handleEntitiesUpdate(
        consultations, 
        this.consultationService.update,
        this.consultationService.create, 
        this.consultationService.remove,
      )
    }



    return { medicalHistory, message: "medical history update successfully!" };
  }
  
  async handleEntitiesUpdate(
    entities: any, 
    updateMethod: (entity: any) => Promise<any>, 
    addMethod: (entity: any) => Promise<any> , 
    removeMethod: (entity: any) => Promise<any>) {
    const { update, add, remove } = entities;

    if (update) {
      for (const entity of update) {
        await updateMethod(entity);
      }
    }

    if (add) {
      for (const entity of add) {
        await addMethod(entity);
      }
    }

    if (remove) {
      for (const entity of remove) {
        await removeMethod(entity);
      }
    }
  }
}
