import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatistiquesPresenceDto } from './dto/create-statistiques-presence.dto';
import { UpdateStatistiquesPresenceDto } from './dto/update-statistiques-presence.dto';
import { StatistiquesPresence } from './entities/statistiques-presence.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class StatistiquesPresencesService {
  constructor(
    @InjectRepository(StatistiquesPresence)
    private readonly statsRepository: Repository<StatistiquesPresence>) {
  }
  async create(createStatistiquesPresenceDto: CreateStatistiquesPresenceDto) {
    const stat=this.statsRepository.create(createStatistiquesPresenceDto);
    return await this.statsRepository.save(stat);
  }

  async findAll() {
    return await this.statsRepository.find();
  }

  async findOne(id: number) {
    return await this.statsRepository.findOne({where: {id}});
  }

  async update(id: number, updateStatistiquesPresenceDto: UpdateStatistiquesPresenceDto) {
    const stat=await this.findOne(id);
    if(!stat){
      throw new NotFoundException();    }
      Object.assign(stat,updateStatistiquesPresenceDto);
      return await this.statsRepository.save(stat);
  }

  async remove(id: number) {
    const stat= await this.findOne(id);
    if(!stat){
      throw new NotFoundException();
    }
    return await this.statsRepository.remove(stat);
  }
}
