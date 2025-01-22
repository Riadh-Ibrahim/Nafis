import { ChambreLog } from "./chambre-log.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
    OneToMany,
  } from "typeorm";
@Entity('chambre_historique')
export class ChambreHistorique {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chambreId: string;

  @OneToMany(() => ChambreLog, (log) => log.chambreHistorique)
  historique: ChambreLog[];
}

