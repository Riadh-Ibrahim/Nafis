import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admins')
export class Admin {
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

  @Column()
  adresse: string;

  @Column()
  telephone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  photoUrl: string;
}