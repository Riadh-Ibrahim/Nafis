import { IsEmail } from "class-validator";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true})
    id: number;

    @Column( {nullable: true})
    firstname: string;

    @Column({nullable: true})
    lastname: string;
    
    @IsEmail()
    @Column()
    email: string;

    @Column({ length: 100, nullable: true})
    password: string;

    @Column({
        type: 'enum', 
        enum: UserRoleEnum, 
    })
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
