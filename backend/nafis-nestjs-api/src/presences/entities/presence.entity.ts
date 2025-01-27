import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Personnel } from 'src/personnels/entities/personnel.entity';
import { PersonnelStatut } from 'src/personnels/entities/personnel.entity';
@Entity('presences')
export class Presence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  date: Date;

  @Column({
    type: 'enum',
    enum: PersonnelStatut,
  })
  statut: PersonnelStatut; 

  @Column({ nullable: false })
  personnelId: number;

  @Column({ nullable: true })
  commentaire: string;

  @ManyToOne(() => Personnel, (personnel) => personnel.presences)
  personnel: Personnel;

  // Ensure personnelId is synchronized with personnel.id before insert or update
  @BeforeInsert()
  @BeforeUpdate()
  syncPersonnelId() {
    if (this.personnel) {
      this.personnelId = this.personnel.id;
    }
  }
}
