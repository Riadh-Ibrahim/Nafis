/* eslint-disable prettier/prettier */
import { Consultation } from "src/consultations/entities/consultation.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Document } from "src/documents/entities/document.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("medical_history")
export class MedicalHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Patient, (patient) => patient.medicalHistory)
    @JoinColumn({ name: 'patientId' })
    patient: Patient;

    @OneToMany(() => Consultation, (consultation) => consultation.medicalHistory)
    @JoinColumn({name: "id_consultations_medicalHistoryId"})
    consultations: Consultation[];

    @OneToMany(() => Document, (document) => document.medicalHistory)
    @JoinColumn({name: "id_documents_medicalHistoryId"})
    documents: Document[];
    
}
