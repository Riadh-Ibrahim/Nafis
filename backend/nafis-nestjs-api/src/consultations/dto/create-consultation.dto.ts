import { IsString, IsDateString, IsArray, IsNotEmpty, IsInt } from 'class-validator';
import { Patient } from 'src/patients/entities/patient.entity';

export class CreateConsultationDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  medecin: string;

  @IsString()
  @IsNotEmpty()
  diagnostic: string;

  @IsArray()
  @IsNotEmpty()
  prescriptions: string[];

  @IsInt()
  @IsNotEmpty()
  patientId: number;

  // Optional: If you want to include the patient data in the DTO
  patient?: Patient;
}
