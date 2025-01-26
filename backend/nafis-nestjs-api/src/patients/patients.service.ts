/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/admin.entity';
@Injectable()
export class PatientsService {

  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: Repository<Patient>) {
  }
  async create(userId: number, admin: Admin, newPatientData: CreatePatientDto) {
    try {
      const newPatient=this.patientsRepository.create({
         ...newPatientData,
         admin: admin,
         user: {id: userId}
      });
      const patientEntity =  await this.patientsRepository.save(newPatient);
      return patientEntity;

    } catch (error) {
      console.log(error);
      throw new ConflictException("Cannot create patient");
    }

  }

  async findAll() {
    return await this.patientsRepository.find();
  }

  async findOne(id: number) {
    return await this.patientsRepository.findOne({where:{id}});
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient=await this.findOne(id);
    if(!patient){
      throw new NotFoundException();
    }
    Object.assign(patient,updatePatientDto);
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
}
