import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
