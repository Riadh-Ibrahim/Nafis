import { IsInt, IsString, IsEnum, IsBoolean, IsDateString } from 'class-validator';
import { ExpediteurType } from '../entities/message.entity';

export class MessageDto {
  @IsInt()
  conversationId: number;

  @IsInt()
  expediteurId: number;

  @IsEnum(ExpediteurType)
  expediteurType: ExpediteurType;

  @IsString()
  contenu: string;

  @IsDateString()
  dateEnvoi: Date;

  @IsBoolean()
  seen: boolean;

  @IsString()
  pieceJointe: string;
}
