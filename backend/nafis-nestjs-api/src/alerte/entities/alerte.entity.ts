import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ConstantesVitales } from 'src/constantes-vitales/entities/constantes-vitale.entity';
export enum AlerteType {
  CRITIQUE = 'CRITIQUE',
  ATTENTION = 'ATTENTION',
  INFO = 'INFO',
}

@Entity('alertes')
export class Alerte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AlerteType,
    enumName: 'alerte_type',
  })
  type: AlerteType;

  @Column()
  message: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ default: false })
  acquittee: boolean;

  @Column({ nullable: true })
  acquitteePar: string;

  @ManyToOne(() => ConstantesVitales, (constantesVitales) => constantesVitales.alertes)
  @JoinColumn()
  constantesVitales: ConstantesVitales;
}