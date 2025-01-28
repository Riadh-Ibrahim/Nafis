import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { Personnel } from 'src/personnels/entities/personnel.entity';
export enum RendezvousStatut {
  PLANIFIE = 'PLANIFIE',
  CONFIRME = 'CONFIRME',
  ANNULE = 'ANNULE',
}
@Entity('rendezvous')
export class RendezVous {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  patientId: number;

  @Column({ nullable: true })
  medecinId: number;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column({ nullable: false })
  motif: string;

  @Column({
    type: 'enum',
    enum: RendezvousStatut,
    default: RendezvousStatut.PLANIFIE,
    enumName:'rendezvous_statut',
  })
  statut: RendezvousStatut;

  @Column({ default: false })
  rappelEnvoye: boolean;


  @ManyToOne(() => Patient, (patient) => patient.rendezvous)
  patient: Patient;

  @ManyToOne(() => Personnel, (personnel) => personnel.rendezvous)
  medecin: Personnel;

  
  @BeforeInsert()
  @BeforeUpdate()
  syncPatientId() {
    if (this.patient) {
      this.patientId = this.patient.id;
    }
  }

  // Synchronize medecinId with the medecin.id before insert or update
  @BeforeInsert()
  @BeforeUpdate()
  syncMedecinId() {
    if (this.medecin) {
      this.medecinId = this.medecin.id;
    }
  }
}
