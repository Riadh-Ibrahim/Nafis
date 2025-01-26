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
    private readonly rendezvousRepository: Repository<RendezVous>) {
  }
  async create(createRendezVousDto: CreateRendezVousDto) {
    const rv=this.rendezvousRepository.create(createRendezVousDto);
    return await this.rendezvousRepository.save(rv);
  }

  async findAll() {
    return await this.rendezvousRepository.find();
  }

  async findOne(id: number) {
    return await this.rendezvousRepository.findOne({where: {id}});
  }

  async update(id: number, updateRendezVousDto: UpdateRendezVousDto) {
    const rv=await this.findOne(id);
    if(!rv){
      throw new NotFoundException();
    }
    Object.assign(rv,updateRendezVousDto);
    return await this.rendezvousRepository.save(rv);
  }

  async remove(id: number) {
    const rv=await this.findOne(id);
    if(!rv){
      throw new NotFoundException();
    }
    return await this.rendezvousRepository.remove(rv);
  }
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleReminders() {
    await this.sendReminders();
  }

  async sendReminders() {
    const now = new Date();
    const upcomingAppointments = await this.rendezvousRepository.find({
      where: {
        date: MoreThan(now),  
        rappelEnvoye: false,  
      },
    });

    for (const appointment of upcomingAppointments) {
      const reminderTime = new Date(appointment.date);
      reminderTime.setMinutes(reminderTime.getMinutes() - 30); 

      if (now >= reminderTime) {
        const patient: Patient = appointment.patient;
        const doctor: Personnel = appointment.medecin;

        this.logger.log(`Sending reminder to patient: ${patient.name} for appointment with Dr. ${doctor.name}`);

        appointment.rappelEnvoye = true;
        await this.rendezvousRepository.save(appointment);
      }
    }
  }

  async getNotifications(id: number): Promise<RendezVous[]> {
    const appointments = await this.rendezvousRepository.find({
      where: {
        patientId: id,
        rappelEnvoye: true, 
      },
    });

    if (!appointments) {
      throw new NotFoundException('No appointments found for this patient');
    }

    return appointments;
  }
}
