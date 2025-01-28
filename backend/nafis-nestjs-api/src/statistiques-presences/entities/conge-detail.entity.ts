import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { StatistiquesPresence } from './statistiques-presence.entity';

export enum CongeType {
  ANNUEL = 'ANNUEL',
  MALADIE = 'MALADIE',
  FORMATION = 'FORMATION',
  AUTRE = 'AUTRE',
}

@Entity('conge_details')
export class CongeDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  personnelId: number;

  @Column({ type: 'date' })
  debut: Date;

  @Column({ type: 'date' })
  fin: Date;

  @Column({
    type: 'enum',
    enum: CongeType,
    enumName: 'conge_type',
  })
  type: CongeType;

  @Column({ nullable: true })
  motif: string;

  @ManyToOne(() => StatistiquesPresence, (stats) => stats.conges)
  statistiquesPresence: StatistiquesPresence;
}