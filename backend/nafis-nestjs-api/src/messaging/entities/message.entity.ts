import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ConversationEntity } from './conversation.entity';

export enum ExpediteurType {
  PATIENT = 'PATIENT',
  MEDECIN = 'MEDECIN',
}

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  expediteurId: number;

  @Column({
    type: 'enum',
    enum: ExpediteurType,
  })
  expediteurType: ExpediteurType;

  @Column()
  contenu: string;

  @Column()
  dateEnvoi: Date;

  @Column()
  seen: boolean;

  @Column({ nullable: true })
  pieceJointe: string;

  @ManyToOne(() => ConversationEntity, (conversation) => conversation.messages)
  conversation: ConversationEntity;
}
