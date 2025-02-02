import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, IsEnum, IsDateString } from 'class-validator';

export enum StatutMessageRequest {
  EN_ATTENTE = 'EN_ATTENTE',
  ACCEPTE = 'ACCEPTE',
  REFUSE = 'REFUSE',
}

@Entity('message_requests')
export class MessageRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  patientId: number;

  @Column()
  @IsInt()
  doctorId: number;

  @Column({ type: 'enum', enum: StatutMessageRequest, default: StatutMessageRequest.EN_ATTENTE })
  @IsEnum(StatutMessageRequest)
  statut: StatutMessageRequest;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsDateString()
  dateCreation: Date;
}
