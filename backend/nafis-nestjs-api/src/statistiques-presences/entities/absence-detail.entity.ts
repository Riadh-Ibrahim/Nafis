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
import { StatistiquesPresence } from "./statistiques-presence.entity";

@Entity('absence_details')
export class AbsenceDetail {
@PrimaryGeneratedColumn()
id: number;

@Column()
personnelId: number;

@Column({ type: 'date' })
date: Date;

@Column()
justifie: boolean;

@Column({ nullable: true })
motif: string;

@ManyToOne(() => StatistiquesPresence, (stats) => stats.absences)
statistiquesPresence: StatistiquesPresence;
}