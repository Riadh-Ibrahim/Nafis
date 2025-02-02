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
    // Ensure date is converted to a Date object from string
    const presence = this.presencesRepository.create({
      ...createPresenceDto,
      date: new Date(createPresenceDto.date), // Convert date to Date object
    });

    return await this.presencesRepository.save(presence);
  }

  async findAll() {
    return await this.presencesRepository.find();
  }

  async findOne(id: number) {
    const presence = await this.presencesRepository.findOne({ where: { id } });
    if (!presence) {
      throw new NotFoundException('Presence not found');
    }
    return presence;
  }

  async update(id: number, updatePresenceDto: UpdatePresenceDto) {
    const presence = await this.findOne(id);
    if (!presence) {
      throw new NotFoundException('Presence not found');
    }

    // If the personnelId is updated, we ensure it's set correctly
    if (updatePresenceDto.personnelId && updatePresenceDto.personnelId !== presence.personnelId) {
      presence.personnelId = updatePresenceDto.personnelId;
    }

    // Update presence with the new data
    Object.assign(presence, updatePresenceDto);
    return await this.presencesRepository.save(presence);
  }

  async remove(id: number) {
    const presence = await this.findOne(id);
    if (!presence) {
      throw new NotFoundException('Presence not found');
    }
    return await this.presencesRepository.remove(presence);
  }

  async findByPersonnelId(personnelId: number): Promise<Presence[]> {
    return await this.presencesRepository.find({ where: { personnelId } });
  }
}
