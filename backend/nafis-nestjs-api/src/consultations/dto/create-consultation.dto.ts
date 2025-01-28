import { IsString, IsDate, IsArray, IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConsultationDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) // Automatically transforms ISO string to Date
  date: Date;

  @IsInt()
  @IsNotEmpty()
  medecinId: number;

  @IsString()
  @IsNotEmpty()
  diagnostic: string;

  @IsArray()
  @IsNotEmpty()
  prescriptions: string[];

  @IsInt()
  @IsNotEmpty()
  patientId: number;
}
