import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientsService } from 'src/patients/patients.service'; // Make sure to inject PatientsService if you need to validate patient

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
    private readonly patientsService: PatientsService, // Inject PatientsService for patient validation
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    // Ensure the patient exists by checking the patientId
    const patient = await this.patientsService.findOne(createDocumentDto.patientId);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // Create and save the document
    const document = this.documentsRepository.create(createDocumentDto);
    document.patient = patient; // Associate the document with the patient
    return await this.documentsRepository.save(document);
  }

  async findAll() {
    return await this.documentsRepository.find();
  }

  async findOne(id: number) {
    const document = await this.documentsRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.findOne(id);
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    // If patientId is being updated, validate the patient
    if (updateDocumentDto.patientId && updateDocumentDto.patientId !== document.patientId) {
      const patient = await this.patientsService.findOne(updateDocumentDto.patientId);
      if (!patient) {
        throw new NotFoundException('Patient not found');
      }
      document.patient = patient; // Update the associated patient
    }

    // Update the document with the new data
    Object.assign(document, updateDocumentDto);
    return await this.documentsRepository.save(document);
  }

  async remove(id: number) {
    const document = await this.findOne(id);
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return await this.documentsRepository.remove(document);
  }
}
