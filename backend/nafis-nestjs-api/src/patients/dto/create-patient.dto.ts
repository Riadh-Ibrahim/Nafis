import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { CreatePersonBaseDto } from 'src/common/dto/create-person-base.dto';

export class CreatePatientDto extends CreatePersonBaseDto {
  @IsNotEmpty()
  @IsDateString()
  dateNaissance: Date;

  @IsNotEmpty()
  @IsString()
  numeroSecu: string;

  @IsOptional()
  @IsString()
  adresse: string;

  @IsOptional()
  @IsString()
  telephone: string;
}
