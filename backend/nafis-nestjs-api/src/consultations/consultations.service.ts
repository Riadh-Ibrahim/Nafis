import { Injectable, NotFoundException, BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';
import { Repository } from 'typeorm';
import { PersonnelsService } from 'src/personnels/personnels.service';
import { PersonnelType } from 'src/personnels/entities/personnel.entity';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationsRepository: Repository<Consultation>,
    @Inject(forwardRef(() => PersonnelsService))
    private readonly personnelService: PersonnelsService, // Inject PersonnelService
  ) {}

  async create(createConsultationDto: CreateConsultationDto) {
    // Validate that the selected personnel is a doctor (MEDECIN)
    const medecin = await this.personnelService.findOne(createConsultationDto.medecinId);
    if (!medecin || medecin.type !== PersonnelType.MEDECIN) {
      throw new BadRequestException('The selected personnel must be a doctor (MEDECIN)');
    }
  
    // Create the consultation entity
    const consultation = this.consultationsRepository.create({
      ...createConsultationDto,
      medecin, // Explicitly set the medecin relationship
    });
  
    // Save the consultation
    return await this.consultationsRepository.save(consultation);
  }
  

  async findAll() {
    return await this.consultationsRepository.find();
  }

  async findOne(id: number) {
    return await this.consultationsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateConsultationDto: UpdateConsultationDto) {
    const consultation = await this.findOne(id);
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }
  
    // If the medecinId is being updated, validate the new medecinId
    if (updateConsultationDto.medecinId && updateConsultationDto.medecinId !== consultation.medecin.id) {
      // Validate the new medecinId
      const medecin = await this.personnelService.findOne(updateConsultationDto.medecinId);
      if (!medecin || medecin.type !== PersonnelType.MEDECIN) {
        throw new BadRequestException('The selected personnel must be a doctor (MEDECIN)');
      }
  
      // Explicitly set the medecin relationship
      consultation.medecin = medecin;
    }
  
    // Update the consultation with the new data
    Object.assign(consultation, updateConsultationDto);
  
    // Save the updated consultation
    return await this.consultationsRepository.save(consultation);
  }
  

  async remove(id: number) {
    const consultation = await this.findOne(id);
    if (!consultation) {
      throw new NotFoundException();
    }
    return await this.consultationsRepository.remove(consultation);
  }

  // Method to validate if the medecinId corresponds to a doctor (MEDECIN)
  private async validateMedecinType(medecinId: number) {
    const personnel = await this.personnelService.findOne(medecinId);
    if (!personnel) {
      throw new NotFoundException('Personnel not found');
    }

    if (personnel.type !== PersonnelType.MEDECIN) {
      throw new BadRequestException('The selected personnel must be a doctor (MEDECIN)');
    }
  }
}
