import { IsInt, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateRendezVousDto {
  @IsInt()
  @IsNotEmpty()
  patientId: number;

  @IsInt()
  @IsNotEmpty()
  medecinId: number;  // MedecinId is now required

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  motif: string;

  @IsString()
  @IsNotEmpty()
  statut: string;
}
