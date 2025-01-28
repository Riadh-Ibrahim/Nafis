import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEnum, IsBoolean, IsInt } from 'class-validator';
import { RendezvousStatut } from '../entities/rendez-vous.entity';

export class CreateRendezVousDto {
  @IsInt()
  @IsNotEmpty()
  patientId: number;

  @IsOptional()
  @IsInt()
  medecinId?: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  motif: string;

  @IsEnum(RendezvousStatut)
  @IsOptional()
  statut: RendezvousStatut = RendezvousStatut.PLANIFIE; // Default value if not provided

  @IsBoolean()
  @IsOptional()
  rappelEnvoye: boolean = false; // Default value if not provided
}
