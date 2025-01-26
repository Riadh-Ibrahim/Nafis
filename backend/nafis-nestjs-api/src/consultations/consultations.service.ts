/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ConsultationsService {
 constructor(
     @InjectRepository(Consultation)
     private readonly consultationsRepository: Repository<Consultation>){}
  
  async addConsultation(createConsultationDto: CreateConsultationDto) {
    const consultation=this.consultationsRepository.create(createConsultationDto);
    return await this.consultationsRepository.save(consultation);
  }

  async findAll() {
    return await this.consultationsRepository.find();
  }

  async findOne(id: number) {
    return await this.consultationsRepository.findOne({where: {id}});

  }

  async updateConsultation(updateConsultationDto: UpdateConsultationDto) {
    const consultation=await this.consultationsRepository.findOne({
      where: {id: updateConsultationDto.consultationId}
    });
    if(!consultation){
      throw new NotFoundException();
    }
    Object.assign(consultation,updateConsultationDto);
    return await this.consultationsRepository.save(consultation);
  }

  async removeConsultation(consultationId: number) {
    const consultation=await this.findOne(consultationId);
    if(!consultation){
      throw new NotFoundException();
    }
    return await this.consultationsRepository.remove(consultation);
  }
}
