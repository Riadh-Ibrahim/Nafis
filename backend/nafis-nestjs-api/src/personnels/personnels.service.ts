import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { Personnel } from './entities/personnel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PresencesService } from 'src/presences/presences.service';
import { ConsultationsService } from 'src/consultations/consultations.service';

@Injectable()
export class PersonnelsService {
  constructor(
    @InjectRepository(Personnel)
    private readonly personnelsRepository: Repository<Personnel>,
    private readonly presencesService: PresencesService,
    @Inject(forwardRef(() => ConsultationsService))
    private readonly consultationService: ConsultationsService,
  ) {}

  async create(createPersonnelDto: CreatePersonnelDto) {
    const personnel = this.personnelsRepository.create(createPersonnelDto);
    // Save the new personnel to the database
    return await this.personnelsRepository.save(personnel);
  }

  async findAll() {
    return await this.personnelsRepository.find();
  }

  async findOne(id: number) {
    const personnel = await this.personnelsRepository.findOne({ where: { id } });
    if (!personnel) {
      throw new NotFoundException('Personnel not found');
    }
    return personnel;
  }

  async update(id: number, updatePersonnelDto: UpdatePersonnelDto) {
    const personnel = await this.findOne(id);
    if (!personnel) {
      throw new NotFoundException('Personnel not found');
    }
    // Apply the updates to the personnel
    Object.assign(personnel, updatePersonnelDto);
    // Save the updated personnel
    return await this.personnelsRepository.save(personnel);
  }

  async remove(id: number) {
    const personnel = await this.findOne(id);
    if (!personnel) {
      throw new NotFoundException('Personnel not found');
    }
    // Remove the personnel from the database
    return await this.personnelsRepository.remove(personnel);
  }
}
