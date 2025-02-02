import { IsEnum } from 'class-validator';
import { StatutMessageRequest } from '../entities/message-request.entity';

export class UpdateMessageStatusDto {
  @IsEnum(StatutMessageRequest, {
    message: `Status must be one of: ${Object.values(StatutMessageRequest).join(', ')}`,
  })
  statut: StatutMessageRequest;
}