import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRendezVousDto } from './dto/create-rendez-vous.dto';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';
import { RendezVous } from './entities/rendez-vous.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { Personnel } from 'src/personnels/entities/personnel.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RendezVousService {
  private readonly logger = new Logger(RendezVousService.name);

  constructor(
    @InjectRepository(RendezVous)
    private readonly rendezvousRepository: Repository<RendezVous>,
  ) {}

  async create(createRendezVousDto: CreateRendezVousDto) {
    // Create the RendezVous entity and assign the necessary properties
    const rendezvous = this.rendezvousRepository.create(createRendezVousDto);
  
    // Check if patient and doctor exist before saving
    if (createRendezVousDto.patientId) {
      const patient = await this.rendezvousRepository.manager.findOne(Patient, {
        where: { id: createRendezVousDto.patientId },
      });
      if (!patient) {
        throw new NotFoundException('Patient not found');
      }
      rendezvous.patient = patient;
    }
  
    if (createRendezVousDto.medecinId) {
      const medecin = await this.rendezvousRepository.manager.findOne(Personnel, {
        where: { id: createRendezVousDto.medecinId },
      });
      if (!medecin) {
        throw new NotFoundException('Doctor not found');
      }
      
      // Check if the Personnel is of type 'MEDECIN'
      if (medecin.type !== 'MEDECIN') {
        throw new NotFoundException('The assigned personnel is not a doctor');
      }
  
      rendezvous.medecin = medecin;
    }
  
    return await this.rendezvousRepository.save(rendezvous);
  }
  
  
  async update(id: number, updateRendezVousDto: UpdateRendezVousDto) {
    const rendezvous = await this.findOne(id);
    if (!rendezvous) {
      throw new NotFoundException('Appointment not found');
    }
  
    // Update fields based on the DTO
    Object.assign(rendezvous, updateRendezVousDto);
  
    // Handle updating relations (patientId and medecinId)
    if (updateRendezVousDto.patientId) {
      const patient = await this.rendezvousRepository.manager.findOne(Patient, {
        where: { id: updateRendezVousDto.patientId },
      });
      if (!patient) {
        throw new NotFoundException('Patient not found');
      }
      rendezvous.patient = patient;
    }
  
    if (updateRendezVousDto.medecinId) {
      const medecin = await this.rendezvousRepository.manager.findOne(Personnel, {
        where: { id: updateRendezVousDto.medecinId },
      });
      if (!medecin) {
        throw new NotFoundException('Doctor not found');
      }
      
      // Check if the Personnel is of type 'MEDECIN'
      if (medecin.type !== 'MEDECIN') {
        throw new NotFoundException('The assigned personnel is not a doctor');
      }
  
      rendezvous.medecin = medecin;
    }
  
    return await this.rendezvousRepository.save(rendezvous);
  }
  
  

  async findAll() {
    return await this.rendezvousRepository.find();
  }

  async findOne(id: number) {
    return await this.rendezvousRepository.findOne({
      where: { id },
      relations: ['patient', 'medecin'], // Include relations
    });
  }

 

  async remove(id: number) {
    const rendezvous = await this.findOne(id);
    if (!rendezvous) {
      throw new NotFoundException('Appointment not found');
    }
    return await this.rendezvousRepository.remove(rendezvous);
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleReminders() {
    const now = new Date();

    try {
      const appointments = await this.rendezvousRepository.find({
        where: {
          date: MoreThan(now),
          rappelEnvoye: false,
        },
        relations: ['patient', 'medecin'],
      });

      for (const appointment of appointments) {
        try {
          const reminderTime = new Date(appointment.date);
          reminderTime.setMinutes(reminderTime.getMinutes() - 30);

          // Check if it's time to send a reminder
          if (now >= reminderTime) {
            await this.sendReminder(appointment);
          }
        } catch (error) {
          this.logger.error(
            `Error processing appointment ${appointment.id}: ${error.message}`,
          );
        }
      }
    } catch (error) {
      this.logger.error(`Error in handleReminders: ${error.message}`);
    }
  }



   async sendReminder(appointment: RendezVous) {
    if (!appointment.patient || !appointment.medecin) {
      this.logger.error(
        `Appointment ${appointment.id} is missing patient or doctor details`,
      );
      return;
    }

    // Simulate sending a reminder (e.g., email, SMS, etc.)
    this.logger.log(
      `Sending reminder to Patient: ${appointment.patient.email} ` +
      `for appointment with Dr. ${appointment.medecin.email}`,
    );

    // Mark the reminder as sent
    appointment.rappelEnvoye = true;
    await this.rendezvousRepository.save(appointment);

    this.logger.log(`Reminder marked as sent for appointment ${appointment.id}`);
  }
  

  async getNotifications(patientId: number): Promise<RendezVous[]> {
    try {
      const appointments = await this.rendezvousRepository.find({
        where: {
          patient: { id: patientId },
          rappelEnvoye: true,
        },
        relations: ['patient', 'medecin'],
      });

      return appointments;
    } catch (error) {
      this.logger.error(`Error fetching notifications for patient ${patientId}`);
      throw error;
    }
  }
}

