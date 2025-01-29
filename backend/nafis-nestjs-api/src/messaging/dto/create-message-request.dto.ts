import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { StatutMessageRequest } from '../entities/message-request.entity';

export class CreateMessageRequestDto {
  @IsInt()
  patientId: number;

  @IsInt()
  doctorId: number;

  @IsEnum(StatutMessageRequest, {
    message: `Status must be one of: ${Object.values(StatutMessageRequest).join(', ')}`,
  })
  @IsOptional()
  statut?: StatutMessageRequest;
}
