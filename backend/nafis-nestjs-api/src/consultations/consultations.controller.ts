/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';


@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  
}
