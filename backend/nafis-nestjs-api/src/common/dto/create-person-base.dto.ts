import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePersonBaseDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;
}
