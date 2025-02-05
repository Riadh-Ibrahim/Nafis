import { IsInt, IsDateString, IsOptional } from 'class-validator';
import { MessageDto } from './message.dto';

export class ConversationDto {
  @IsInt()
  patientId: number;

  @IsInt()
  doctorId: number;

  @IsDateString()
  dateDebut: Date;

  @IsOptional()
  messages: MessageDto[];
}
