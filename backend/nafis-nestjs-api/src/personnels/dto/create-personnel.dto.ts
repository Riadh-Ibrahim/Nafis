import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from "class-validator";
import {
  PersonnelType,
  PersonnelCategorie,
  Specialite,
  PersonnelStatut,
} from "../entities/personnel.entity";

export class CreatePersonnelDto {
  @IsNotEmpty()
  @IsEnum(PersonnelType)
  type?: PersonnelType;

  @IsOptional()
  @IsEnum(PersonnelCategorie)
  categorie?: PersonnelCategorie;

  @IsOptional()
  @IsEnum(Specialite)
  specialite?: Specialite;

  @IsNotEmpty()
  @IsString()
  service?: string;

  @IsNotEmpty()
  @IsString()
  matricule?: string;

  @IsNotEmpty()
  @IsDateString()
  dateRecrutement?: Date;

  @IsOptional()
  @IsEnum(PersonnelStatut)
  statut?: PersonnelStatut;
}
