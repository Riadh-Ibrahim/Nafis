import { IsString, IsNotEmpty, IsEmail, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { PersonnelType, PersonnelCategorie, Specialite, PersonnelStatut } from '../entities/personnel.entity';

export class CreatePersonnelDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsEnum(PersonnelType)
  type: PersonnelType;

  @IsNotEmpty()
  @IsEnum(PersonnelCategorie)
  categorie: PersonnelCategorie;

  @IsNotEmpty()
  @IsEnum(Specialite)
  specialite: Specialite;

  @IsNotEmpty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsString()
  matricule: string;

  @IsNotEmpty()
  @IsDate() // Validates that the field is a valid date
  @Type(() => Date) // Converts the incoming ISO string to a Date object
  dateRecrutement: Date;

  @IsNotEmpty()
  @IsEnum(PersonnelStatut)
  statut: PersonnelStatut;
}
