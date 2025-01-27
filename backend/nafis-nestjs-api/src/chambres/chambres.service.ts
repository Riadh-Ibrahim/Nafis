import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChambreDto } from './dto/create-chambre.dto';
import { UpdateChambreDto } from './dto/update-chambre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chambre } from './entities/chambre.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ChambresService {
  constructor(
    @InjectRepository(Chambre)
    private readonly chambresRepository: Repository<Chambre>,
  ) {}

  
  async create(createChambreDto: CreateChambreDto) {
    const chambre=this.chambresRepository.create(createChambreDto);
    return await this.chambresRepository.save(chambre);
  }

  async findAll() {
    return await this.chambresRepository.find()
  }

  async findOne(numero: number) {
    return await this.chambresRepository.findOne({where: {numero}});
  }

  async update(numero: number, updateChambreDto: UpdateChambreDto) {
    const chambre=await this.findOne(numero);
    if(!chambre){
      throw new NotFoundException();
    }
    Object.assign(chambre,updateChambreDto);
    return await this.chambresRepository.save(chambre);
  }

  async remove(numero: number) {
    const chambre =await this.findOne(numero);
    if(! chambre){
      throw new NotFoundException();
    }
    return await this.chambresRepository.remove(chambre);
  }
}
