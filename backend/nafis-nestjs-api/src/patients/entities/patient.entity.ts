/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Consultation } from 'src/consultations/entities/consultation.entity';
import { Document } from 'src/documents/entities/document.entity';
import { Chambre } from 'src/chambres/entities/chambre.entity';
import { RendezVous } from 'src/rendez-vous/entities/rendez-vous.entity';
import { ConstantesVitales } from 'src/constantes-vitales/entities/constantes-vitale.entity';
import { Admin } from 'src/admin/admin.entity';
import { User } from 'src/user/entities/user.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToOne(()=>User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
  medicalHistory: MedicalHistory;

  @ManyToOne(() => Admin, (admin) => admin.patients)
  admin: Admin;

  @OneToMany(() => Consultation, (consultation) => consultation.patientId)
  consultations: Consultation[];

  @OneToMany(() => Document, (document) => document.patientId)
  documents: Document[];

  @OneToMany(() => RendezVous, (rendezvous) => rendezvous.patientId)
  rendezvous: RendezVous[];

  @OneToMany(() => ConstantesVitales, (cv) => cv.patientId)
  cv: ConstantesVitales[];
  @OneToOne(() => Chambre, (chambre) => chambre.patientId)
  chambre: Chambre;
}
