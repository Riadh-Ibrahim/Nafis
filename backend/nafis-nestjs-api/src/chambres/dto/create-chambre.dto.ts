import { IsNotEmpty, IsEnum, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ChambreType, ChambreStatut } from '../entities/chambre.entity';

export class CreateChambreDto {
  @IsNotEmpty()
  @IsEnum(ChambreType)
  type: ChambreType;

  @IsNotEmpty()
  @IsEnum(ChambreStatut)
  statut: ChambreStatut;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  patientIds?: number[];

  @IsOptional()
  @IsNumber()
  dernierNettoyage?: string;
}
