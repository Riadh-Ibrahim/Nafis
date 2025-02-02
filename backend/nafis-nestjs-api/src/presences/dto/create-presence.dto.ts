import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PersonnelStatut } from 'src/personnels/entities/personnel.entity'; // Adjust the import path if needed

export class CreatePresenceDto {
  @IsDateString()
  date: Date;

  @IsEnum(PersonnelStatut)
  statut: PersonnelStatut;

  @IsInt()
  personnelId: number;

  @IsOptional()
  @IsString()
  commentaire?: string;

  // Optional: If you want to include the personnel data in the DTO
  personnel?: { id: number };
}
