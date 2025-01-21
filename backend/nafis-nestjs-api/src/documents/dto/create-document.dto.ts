import { IsString, IsDateString, IsNotEmpty, IsUrl, IsInt } from 'class-validator';

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
}
