/* eslint-disable prettier/prettier */
import { Consultation } from "src/consultations/entities/consultation.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Document } from "src/documents/entities/document.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MedicalHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Patient, (patient) => patient.medicalHistory)
    @JoinColumn({ name: 'patientId' })
    patient: Patient;

    @OneToMany(() => Consultation, (consultation) => consultation.medicalHistory)
    consultations: Consultation[];

    @OneToMany(() => Document, (document) => document.medicalHistory)
    documents: Document[];
    
}
