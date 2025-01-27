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
@Entity('mission_details')
export class MissionDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  personnelId: number;

  @Column({ type: 'date' })
  debut: Date;

  @Column({ type: 'date' })
  fin: Date;

  @Column()
  description: string;

  @Column()
  lieu: string;

  @ManyToOne(() => StatistiquesPresence, (stats) => stats.missions)
  statistiquesPresence: StatistiquesPresence;
}