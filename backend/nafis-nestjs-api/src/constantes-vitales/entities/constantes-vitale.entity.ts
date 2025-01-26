import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
  } from "typeorm";
  import { Patient } from "src/patients/entities/patient.entity";
import { Alerte } from "src/alerte/alerte.entity";
  
  @Entity('constantes_vitales')
  export class ConstantesVitales {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    patientId: number;
  
    @Column({ type: 'timestamp', nullable: false })
    timestamp: Date;
  
    @Column('float', { nullable: false })
    temperature: number;
  
    @Column({ nullable: false })
    tensionArterielle: string;
  
    @Column('int', { nullable: false })
    frequenceCardiaque: number;
  
    @Column('int', { nullable: false })
    saturationOxygene: number;
  
    @ManyToOne(() => Patient, (patient) => patient.id, { cascade: true, eager: true })
    patient: Patient;
  
    @BeforeInsert()
    @BeforeUpdate()
    syncPatientId() {
      if (this.patient) {
        this.patientId = this.patient.id;
      }
    }
    @OneToMany(() => Alerte, (alerte) => alerte.constantesVitales)
  alertes: Alerte[];
  }
  