/* eslint-disable prettier/prettier */
import { UpdateDocumentDto } from 'src/documents/dto/update-document.dto';
import { UpdateConsultationDto } from 'src/consultations/dto/update-consultation.dto';
import { IsOptional } from 'class-validator';
import { CreateDocumentDto } from 'src/documents/dto/create-document.dto';
import { CreateConsultationDto } from 'src/consultations/dto/create-consultation.dto';

export class UpdateMedicalHistoryDto {
    @IsOptional()
    documents?: {
        update?: UpdateDocumentDto[],
        add?: CreateDocumentDto[],
        remove?: number[],
    };

    @IsOptional()
    consultations?: {
        update?: UpdateConsultationDto[],
        add?: CreateConsultationDto[],
        remove?: number[],
    };
}
