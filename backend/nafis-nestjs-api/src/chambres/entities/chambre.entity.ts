import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { Patient } from "src/patients/entities/patient.entity";
export enum ChambreType {
  SIMPLE = 'SIMPLE',
  DOUBLE = 'DOUBLE',
  SOINS_INTENSIFS = 'SOINS_INTENSIFS',
}

export enum ChambreStatut {
  LIBRE = 'LIBRE',
  OCCUPE = 'OCCUPE',
  NETTOYAGE = 'NETTOYAGE',
}
@Entity('chambres')
export class Chambre {
  @PrimaryGeneratedColumn()
  numero: number;

  @Column({
    type: 'enum',
    enum: ChambreType,
    enumName: 'chambre_type',
  })
  type: ChambreType;


  @Column({
    type: 'enum',
    enum: ChambreStatut,
    default: ChambreStatut.LIBRE,
    enumName: 'chambre_statut',
  })
  statut: ChambreStatut;

 


  @OneToMany(() => Patient, (patient) => patient.chambre)
  patients: Patient[];
  //@OneToOne(() => Patient, (patient) => patient.chambre, { cascade: true, eager: true })
  //@JoinColumn({ name: 'patientId' }) 
  //patient: Patient;
/*
  @BeforeInsert()
  @BeforeUpdate()
  syncPatientId() {
    if (this.patient) {
      this.patientId = this.patient.id;
    }
  }
    */
}
