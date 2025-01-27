import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    IsDateString,
  } from 'class-validator';
  
  export class CreateChambreDto {
    @IsNotEmpty()
    @IsString()
    type: string;
  
    @IsNotEmpty()
    @IsString()
    statut: string;
  
    @IsOptional()
    @IsNumber()
    patientId?: number;
  
    @IsOptional()
    @IsDateString()
    dernierNettoyage?: string;
  }
  