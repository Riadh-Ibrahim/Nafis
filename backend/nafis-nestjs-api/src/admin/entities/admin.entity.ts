/* eslint-disable prettier/prettier */
import { Patient } from 'src/patients/entities/patient.entity';
import { Personnel } from 'src/personnels/entities/personnel.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(()=>User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({name: "user_id"})
  user: User;

  @OneToMany(() => Patient, (patient) => patient.admin)
  patients: Patient[];

  @OneToMany(() => Personnel, (personnel) => personnel.admin)
  personnels: Personnel[];

  

}