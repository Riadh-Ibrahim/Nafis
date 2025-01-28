import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alerte } from './entities/alerte.entity';

@Injectable()
export class AlertesService {
  constructor(
    @InjectRepository(Alerte)
    private readonly alertesRepository: Repository<Alerte>,
  ) {}

  async create(alerte: Partial<Alerte>): Promise<Alerte> {
    const newAlerte = this.alertesRepository.create(alerte);
    return this.alertesRepository.save(newAlerte);
  }

  async findAll(): Promise<Alerte[]> {
    return this.alertesRepository.find();
  }

  async findOne(id: number): Promise<Alerte> {
    return this.alertesRepository.findOneBy({ id });
  }

  async update(id: number, updateData: Partial<Alerte>): Promise<Alerte> {
    await this.alertesRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.alertesRepository.delete(id);
  }
}
