import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { Personnel } from './entities/personnel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class PersonnelsService {
  constructor(
    @InjectRepository(Personnel)
    private readonly personnelsRepository: Repository<Personnel>) {
  }
  
  async create(createPersonnelDto: CreatePersonnelDto) {
    const personnel=this.personnelsRepository.create(createPersonnelDto);
    return await this.personnelsRepository.create(createPersonnelDto);
  }

  async findAll() {
    return await this.personnelsRepository.find();
  }

  async findOne(id: number) {
    return await this.personnelsRepository.findOne({where: {id}});
  }


  async update(id: number, updatePersonnelDto: UpdatePersonnelDto) {
    const personnel=await this.findOne(id);
    if(!personnel){
      throw new NotFoundException();
    }
  }

  async remove(id: number) {
    const personnel=await this.findOne(id);
    if(!personnel){
      throw new NotFoundException();
    }
    return await this.personnelsRepository.remove(personnel);
  }
}
