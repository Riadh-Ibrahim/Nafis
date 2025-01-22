import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate} from 'typeorm'
import { Patient } from 'src/patients/entities/patient.entity'

@Entity('documents')
export class Document {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    type: string;

    @Column({type: 'timestamp',nullable: false})
    date: Date;

    @Column({nullable: false})
    titre: string;

    @Column({nullable: false})
    description: string;
    @Column({nullable: false})
    url: string;

    @Column({nullable: false})
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