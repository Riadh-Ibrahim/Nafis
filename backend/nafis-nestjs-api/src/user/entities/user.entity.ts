/* eslint-disable prettier/prettier */
import { IsEmail } from "class-validator";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "src/patients/entities/patient.entity";
import { Admin } from "src/admin/admin.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true})
    id: number;

    @Column( {nullable: false})
    firstname: string;

    @Column({nullable: false})
    lastname: string;
    
    @IsEmail()
    @Column()
    email: string;

    @Column({ length: 100, nullable: false})
    password: string;

    @Column({
        type: 'enum', 
        enum: UserRoleEnum, 
    })
    role: string;

    @Column({ type: 'date' })
    dateNaissance: Date;

    @Column()
    numeroSecu: string;

    @Column()
    adresse: string;

    @Column()
    telephone: string;

    @Column({ nullable: true })
    photoUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToOne(() => Admin, (admin) => admin.user, { nullable: true })
  @JoinColumn()
  admin?: Admin;

  @OneToOne(() => Patient, (patient) => patient.user, { nullable: true })
  @JoinColumn()
  patient?: Patient;

}
