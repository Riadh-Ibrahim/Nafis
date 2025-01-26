import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { Presence } from './entities/presence.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PresencesService {
  constructor(
    @InjectRepository(Presence)
    private readonly presencesRepository: Repository<Presence>,
  ) {}

  async create(createPresenceDto: CreatePresenceDto) {
    const presence = this.presencesRepository.create({
      ...createPresenceDto,
      date: new Date(createPresenceDto.date), 
    });

    return await this.presencesRepository.save(presence);
  }

  async findAll() {
    return await this.presencesRepository.find();
  }

  async findOne(id: number) {
    return await this.presencesRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePresenceDto: UpdatePresenceDto) {
    const presence = await this.findOne(id);
    if (!presence) {
      throw new NotFoundException();
    }
    Object.assign(presence, updatePresenceDto);
    return await this.presencesRepository.save(presence);
  }

  async remove(id: number) {
    const presence = await this.findOne(id);
    if (!presence) {
      throw new NotFoundException();
    }
    return await this.presencesRepository.remove(presence);
  }
  async findByPersonnelId(personnelId: number): Promise<Presence[]> {
    return await this.presencesRepository.find({ where: { personnelId } });
  }
}
