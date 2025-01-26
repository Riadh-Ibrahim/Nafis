import { IsString, IsNotEmpty, IsInt, IsOptional, IsArray, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateStatistiquesPresenceDto {
  @IsNotEmpty()
  @IsString()
  mois: string;

  @IsNotEmpty()
  @IsInt()
  joursPresent: number;

  @IsNotEmpty()
  @IsInt()
  joursAbsent: number;

  @IsNotEmpty()
  @IsInt()
  joursConge: number;

  @IsNotEmpty()
  @IsInt()
  joursMission: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value)) // Ensure it's treated as a float
  tauxPresence: number;

  @IsNotEmpty()
  @IsArray()
  presencesDetaillees: string[];

  @IsNotEmpty()
  @IsInt()
  personnelId: number; // Pass the personnelId in the DTO

  @IsOptional()
  commentaire?: string;
}
