import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate, JoinColumn } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { Personnel, PersonnelType } from 'src/personnels/entities/personnel.entity';
import { PersonnelsService } from 'src/personnels/personnels.service';

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @ManyToOne(() => Personnel, { nullable: false })
  @JoinColumn({ name: 'medecinId' })  // The column in the table to store the foreign key
  medecin: Personnel;

  @Column({ nullable: false })
  diagnostic: string;

  @Column('text', { array: true, nullable: false })
  prescriptions: string[];

  @Column({ nullable: false })
  patientId: number;

  @ManyToOne(() => Patient, (patient) => patient.id, { cascade: true, eager: true })
  patient: Patient;

  @BeforeInsert()
  @BeforeUpdate()
  syncPatientId() {
    if (this.patient) {
      this.patientId = this.patient.id;
    }
  }
}
