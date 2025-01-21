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
  
  async create(createConsultationDto: CreateConsultationDto) {
    const consultation=this.consultationsRepository.create(createConsultationDto);
    return await this.consultationsRepository.save(consultation);
  }

  async findAll() {
    return await this.consultationsRepository.find();
  }

  async findOne(id: number) {
    return await this.consultationsRepository.findOne({where: {id}});

  }

  async update(id: number, updateConsultationDto: UpdateConsultationDto) {
    const consultation=await this.findOne(id);
    if(!consultation){
      throw new NotFoundException();
    }
    Object.assign(consultation,updateConsultationDto);
    return await this.consultationsRepository.save(consultation);
  }

  async remove(id: number) {
    const consultation=await this.findOne(id);
    if(!consultation){
      throw new NotFoundException();
    }
    return await this.consultationsRepository.remove(consultation);
  }
}
