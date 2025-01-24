/* eslint-disable prettier/prettier */
import {Entity,PrimaryGeneratedColumn, Column,ManyToOne, BeforeInsert, BeforeUpdate} from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';

@Entity('consultations')
export class Consultation{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({type: 'timestamp',nullable: false})
    date: Date;
    
    @Column({nullable: false})
    medecin: string;

    @Column({nullable: false})
    diagnostic: string;
    @Column('text',{array: true,nullable: false})
    prescriptions: string[];

    @Column({nullable: false})
    patientId: number;

    @ManyToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.consultations)
    medicalHistory: MedicalHistory;

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