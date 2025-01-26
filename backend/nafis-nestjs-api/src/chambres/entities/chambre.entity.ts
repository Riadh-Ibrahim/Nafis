import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
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
    })
    type: ChambreType;
  
    @Column({
      type: 'enum',
      enum: ChambreStatut,
      default: ChambreStatut.LIBRE,
    })
    statut: ChambreStatut;
  
    @Column({ nullable: true })
    patientId: number;
  

  
    @OneToOne(() => Patient, (patient) => patient.chambre, { cascade: true, eager: true })
    @JoinColumn({ name: 'patientId' }) // Ensures the patientId column is linked to the Patient relationship
    patient: Patient;
  
    @BeforeInsert()
    @BeforeUpdate()
    syncPatientId() {
      if (this.patient) {
        this.patientId = this.patient.id;
      }
    }
  }
  