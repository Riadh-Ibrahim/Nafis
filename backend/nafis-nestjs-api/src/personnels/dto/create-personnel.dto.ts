import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { CreatePersonBaseDto } from 'src/common/dto/create-person-base.dto';
export class CreatePersonnelDto extends CreatePersonBaseDto {
  @IsNotEmpty()
  @IsString()
  fonction: string;

  @IsNotEmpty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  statut: string;
}
