import { IsString, IsNotEmpty, IsDateString, IsUrl, IsInt } from 'class-validator';
import { Patient } from 'src/patients/entities/patient.entity';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsInt()
  @IsNotEmpty()
  patientId: number;

  // Optional: If you want to include the patient data in the DTO
  patient?: Patient;
}
