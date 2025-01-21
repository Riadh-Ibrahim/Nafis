import { IsString, IsNotEmpty, IsOptional, IsInt, IsDateString, IsEnum } from 'class-validator';
import { PresenceStatut } from '../entities/presence.entity';

export class CreatePresenceDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  @IsEnum(PresenceStatut)  
  statut: PresenceStatut;


  @IsInt()
  @IsNotEmpty()
  personnelId: number;

  @IsOptional()
  @IsString()
  commentaire?: string;
}
