import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Personnel } from "src/personnels/entities/personnel.entity";
import { CongeDetail } from "./conge-detail.entity";
import { AbsenceDetail } from "./absence-detail.entity";
import { MissionDetail } from "./mission-detail.entity";
import { Presence } from "src/presences/entities/presence.entity";

@Entity('statistiques_presence')
export class StatistiquesPresence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  personnelId: number;

  @Column({ nullable: false })
  mois: string;

  @Column('int', { nullable: false })
  joursPresent: number;

  @Column('int', { nullable: false })
  joursAbsent: number;

  @Column('int', { nullable: false })
  joursConge: number;

  @Column('int', { nullable: false })
  joursMission: number;

  @Column('float', { nullable: false })
  tauxPresence: number;

  // Establish a OneToMany relationship with Presence
  @OneToMany(() => Presence, (presence) => presence.personnel)
  presencesDetaillees: Presence[];

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

  @OneToMany(() => CongeDetail, (conge) => conge.statistiquesPresence)
  conges: CongeDetail[];

  @OneToMany(() => AbsenceDetail, (absence) => absence.statistiquesPresence)
  absences: AbsenceDetail[];

  @OneToMany(() => MissionDetail, (mission) => mission.statistiquesPresence)
  missions: MissionDetail[];
}
