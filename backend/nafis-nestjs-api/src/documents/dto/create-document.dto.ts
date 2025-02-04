import { IsString, IsNotEmpty, IsDateString, IsUrl, IsNumber } from 'class-validator';

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

  

}
