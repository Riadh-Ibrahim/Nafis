import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationDto } from './create-consultation.dto';
import { IsNegative, IsNumber } from 'class-validator';

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
    @IsNumber()
    @IsNegative()
    consultationId: number;
}
