/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PatientsService {

  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: Repository<Patient>) {
  }
  async create(adminId: number, userId: number) {
    const patient=this.patientsRepository.create({admin: {id: adminId}, user: {id: userId}});
    return await this.patientsRepository.save(patient);
  }

  async findAll() {
    return await this.patientsRepository.find({
      relations: ['user'],
    });
  }

  async findOne(patientId: number) {
    return await this.patientsRepository.findOne({
      where:{id: patientId},
      relations: ['user'],
    });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient=await this.findOne(id);
    if(!patient){
      throw new NotFoundException();
    }
    Object.assign(patient,UpdatePatientDto);
    return await this.patientsRepository.save(patient);
  }

  async remove(id: number) {
    const patient=await this.findOne(id);
    if(!patient){
      throw new NotFoundException();
    }
    return await this.patientsRepository.remove(patient);
  }
  async findPatientHistory(patientId: number) {
    const patient = await this.patientsRepository.findOne({
      where: { id: patientId },
      relations: ['documents', 'consultations'], // Eager load related entities
    });

    if (!patient) {
      throw new NotFoundException(`Patient with id ${patientId} not found`);
    }

    return {
      patient,
      documents: patient.documents,  
      consultations: patient.consultations, 
    };
  }
  async findByIds(ids: number[]): Promise<Patient[]> {
    return await this.patientsRepository.findByIds(ids); 
  }
}
