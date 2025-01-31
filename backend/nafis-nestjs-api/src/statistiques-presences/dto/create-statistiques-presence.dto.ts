import { IsInt, IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateStatistiquesPresenceDto {
  @IsNotEmpty()
  @IsInt()
  personnelId: number;

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

  @IsOptional()
  @IsNumber()
  tauxPresence?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  presencesDetaillees?: number[];

  @IsArray()
  @IsInt({ each: true })
  conges: number[];

  @IsArray()
  @IsInt({ each: true })
  absences: number[];

  @IsArray()
  @IsInt({ each: true })
  missions: number[];
}
