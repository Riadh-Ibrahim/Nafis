/* eslint-disable prettier/prettier */
import { Entity,PrimaryGeneratedColumn,Column,OneToMany, JoinColumn, OneToOne} from 'typeorm';
import { Presence } from 'src/presences/entities/presence.entity';
import { RendezVous } from 'src/rendez-vous/entities/rendez-vous.entity';
import { User } from 'src/user/entities/user.entity';

export enum PersonnelType {
    MEDECIN = 'MEDECIN',
    INFIRMIER = 'INFIRMIER',
    AIDE_SOIGNANT = 'AIDE_SOIGNANT',
    ADMINISTRATIF = 'ADMINISTRATIF',
    TECHNICIEN = 'TECHNICIEN',
  }
  
  export enum PersonnelCategorie {
    TITULAIRE = 'TITULAIRE',
    CONTRACTUEL = 'CONTRACTUEL',
    VACATAIRE = 'VACATAIRE',
    STAGIAIRE = 'STAGIAIRE',
    RESIDENT = 'RESIDENT',
  }
  
  export enum Specialite {
    CARDIOLOGIE = 'CARDIOLOGIE',
    PEDIATRIE = 'PEDIATRIE',
    NEUROLOGIE = 'NEUROLOGIE',
    URGENCES = 'URGENCES',
    CHIRURGIE = 'CHIRURGIE',
    RADIOLOGIE = 'RADIOLOGIE',
    PSYCHIATRIE = 'PSYCHIATRIE',
    GENERALISTE = 'GENERALISTE',
    AUTRE = 'AUTRE',
  }
  
  export enum PersonnelStatut {
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    CONGE = 'CONGE',
    MISSION = 'MISSION',
  }
@Entity('personnels')
export class Personnel{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      type: 'enum',
      enum: PersonnelType,
    })
    type: PersonnelType;
  
    @Column({
      type: 'enum',
      enum: PersonnelCategorie,
    })
    categorie: PersonnelCategorie;
  
    @Column({
      type: 'enum',
      enum: Specialite,
      nullable: true,
    })
    specialite: Specialite;
  
    @Column()
    service: string;
  
    @Column()
    matricule: string;
  
    @Column({ type: 'date' })
    dateRecrutement: Date;
  
    @Column({
      type: 'enum',
      enum: PersonnelStatut,
      default: PersonnelStatut.PRESENT,
    })
    statut: PersonnelStatut;

    @OneToOne(()=>User, { onDelete: 'CASCADE', eager: true })
    @JoinColumn()
    user: User;

    @OneToMany(()=>Presence,(presence)=>presence.personnelId)
    presences: Presence[];

    @OneToMany(()=> RendezVous,(rendezvous)=> rendezvous.medecinId)
    rendezvous: RendezVous[];
}