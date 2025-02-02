import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { Consultation } from 'src/consultations/entities/consultation.entity';
import { Document } from 'src/documents/entities/document.entity';
import { Chambre } from 'src/chambres/entities/chambre.entity';
import { RendezVous } from 'src/rendez-vous/entities/rendez-vous.entity';
import { ConstantesVitales } from 'src/constantes-vitales/entities/constantes-vitale.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { User } from 'src/user/entities/user.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ type: 'date' })
  dateNaissance: Date;

  @Column()
  numeroSecu: string;

  @Column({ nullable: true })
  adresse: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  photoUrl: string;
  @OneToMany(() => Consultation, (consultation) => consultation.patientId)
  consultations: Consultation[];

  @OneToMany(() => Document, (document) => document.patientId)
  documents: Document[];

  @OneToMany(() => RendezVous, (rendezvous) => rendezvous.patientId)
  rendezvous: RendezVous[];

  @OneToMany(() => ConstantesVitales, (cv) => cv.patientId)
  cv: ConstantesVitales[];
  @ManyToOne(() => Chambre, (chambre) => chambre.patients)
  chambre: Chambre;
  @ManyToOne(() => Admin, (admin) => admin.patients)
  admin: Admin;
  @OneToOne(() => User, (user) => user.patient, { nullable: true })
  user?:User;
   @ManyToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.patient, { cascade: true })
    medicalHistory: MedicalHistory;

}
