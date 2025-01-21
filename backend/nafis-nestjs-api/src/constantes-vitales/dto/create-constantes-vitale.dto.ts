import { IsNotEmpty, IsNumber, IsString, IsDate, IsInt, IsPositive } from 'class-validator';

export class CreateConstantesVitalesDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  patientId: number;

  @IsNotEmpty()
  @IsDate()
  timestamp: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  temperature: number;

  @IsNotEmpty()
  @IsString()
  tensionArterielle: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  frequenceCardiaque: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  saturationOxygene: number;
}
