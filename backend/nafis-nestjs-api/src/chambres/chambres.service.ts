import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateChambreDto } from './dto/create-chambre.dto';
import { UpdateChambreDto } from './dto/update-chambre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chambre, ChambreStatut, ChambreType } from './entities/chambre.entity';
import { Repository } from 'typeorm';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class ChambresService {
  constructor(
    @InjectRepository(Chambre)
    private readonly chambresRepository: Repository<Chambre>,
    private readonly patientsService: PatientsService, // Use PatientsService instead of direct repository
  ) {}

  // Helper function to enforce the chambre rules based on its type and statut
  private checkChambreLogic(chambre: Chambre, patientIds: number[] = []) {
    const patients = chambre.patients || [];
  
    // Special handling for NETTOYAGE status
    if (chambre.statut === ChambreStatut.NETTOYAGE) {
      if (patients.length > 0) {
        throw new BadRequestException('A room in NETTOYAGE cannot have any patients.');
      }
      if (patientIds.length > 0) {
        throw new BadRequestException('You cannot assign patients to a room in NETTOYAGE.');
      }
      return;
    }
  
    // 2. Max Patients Based on ChambreType
    if (chambre.type === ChambreType.SIMPLE || chambre.type === ChambreType.SOINS_INTENSIFS) {
      if (patients.length > 1) {
        throw new BadRequestException('A SIMPLE or SOINS_INTENSIFS room can only have 1 patient.');
      }
    }
  
    if (chambre.type === ChambreType.DOUBLE) {
      if (patients.length > 2) {
        throw new BadRequestException('A DOUBLE room can only have up to 2 patients.');
      }
    }
  
    // 3. Status logic for non-NETTOYAGE statuses
    if (patients.length === 0) {
      chambre.statut = ChambreStatut.LIBRE;
    } else if (patients.length > 0) {
      chambre.statut = ChambreStatut.OCCUPE;
    }
  }
  // Helper function to automatically set the chambre statut based on patientIds
  private setChambreStatutBasedOnPatients(chambre: Chambre, patientIds: number[]) {
    // If statut is NETTOYAGE, do NOT change it under any circumstances
    if (chambre.statut === ChambreStatut.NETTOYAGE) {
      if (patientIds.length > 0) {
        throw new BadRequestException('Cannot assign patients to a room in NETTOYAGE.');
      }
      return; // Explicitly keep statut as NETTOYAGE
    }
  
    // For other statuses, set based on patients
    if (patientIds.length > 0) {
      chambre.statut = ChambreStatut.OCCUPE;
    } else {
      chambre.statut = ChambreStatut.LIBRE;
    }
  }
  
  
  
  

  async create(createChambreDto: CreateChambreDto) {
    const { patientIds = [], ...chambreData } = createChambreDto;
  
    if (!Array.isArray(patientIds)) {
      throw new BadRequestException('patientIds must be an array');
    }
  
    const chambre = this.chambresRepository.create({
      ...chambreData,
      statut: createChambreDto.statut, // Explicitly set the original statut
      patients: []
    });
  
    if (patientIds.length > 0) {
      const patients = await this.patientsService.findByIds(patientIds);
  
      if (patients.length !== patientIds.length) {
        throw new NotFoundException('Some patients not found');
      }
  
      chambre.patients = patients;
    }
  
    this.checkChambreLogic(chambre);
  
    return await this.chambresRepository.save(chambre);
  }

  
  

  async findAll() {
    return await this.chambresRepository.find({ relations: ['patients'] });
  }

  async findOne(numero: number) {
    return await this.chambresRepository.findOne({
      where: { numero },
      relations: ['patients'],
    });
  }

  async update(numero: number, updateChambreDto: UpdateChambreDto) {
    // Find the chambre to update
    const chambre = await this.findOne(numero);
  
    if (!chambre) {
      throw new NotFoundException(`Chambre with numero ${numero} not found`);
    }
  
    // Destructure the input DTO, defaulting patientIds to an empty array
    const { patientIds = [], ...updateData } = updateChambreDto;
  
    // Ensure patientIds is always an array
    if (!Array.isArray(patientIds)) {
      throw new BadRequestException('patientIds must be an array');
    }
  
    // Set the room status based on patientIds (before making changes to the room)
    this.setChambreStatutBasedOnPatients(chambre, patientIds); 
  
    // If patientIds are provided, ensure the patients exist and update the room's patients
    if (patientIds.length > 0) {
      const patients = await this.patientsService.findByIds(patientIds);
  
      if (patients.length !== patientIds.length) {
        throw new NotFoundException('Some patients not found');
      }
  
      // Clear previous patients and assign new ones
      chambre.patients = patients;
    }
  
    // Update the chambre with new data (excluding patientIds)
    Object.assign(chambre, updateData);
  
    // Enforce chambre logic to ensure it follows the room rules
    this.checkChambreLogic(chambre);
  
    // Save the updated chambre and return it
    return await this.chambresRepository.save(chambre);
}

  


async remove(numero: number) {
  // Find the chambre to remove
  const chambre = await this.findOne(numero);

  if (!chambre) {
    throw new NotFoundException(`Chambre with numero ${numero} not found`);
  }

  // Disassociate patients before removing the chambre
  chambre.patients = []; // Clear the patients from the room

  // Save the updated chambre to persist the disassociation (if needed)
  await this.chambresRepository.save(chambre);

  // Remove the chambre from the repository
  await this.chambresRepository.remove(chambre);

  // Optionally, return the removed chambre or a confirmation message
  return { message: `Chambre with numero ${numero} successfully removed` };
}

}
