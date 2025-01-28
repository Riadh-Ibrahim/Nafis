import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from "typeorm";
import { ChambreHistorique } from "./chambre-historique.entity";
import { ChambreStatut } from "./chambre.entity";
@Entity('chambre_logs')
export class ChambreLog {
@PrimaryGeneratedColumn()
id: number;

@Column({ type: 'timestamp' })
date: Date;

@Column({
  type: 'enum',
  enum: ChambreStatut,
  enumName: 'chambre_statut',
})
statut: ChambreStatut;

@Column({ nullable: true })
patientId: number;

@Column({ nullable: true })
message: string;

@ManyToOne(() => ChambreHistorique, (historique) => historique.historique)
chambreHistorique: ChambreHistorique;
}





