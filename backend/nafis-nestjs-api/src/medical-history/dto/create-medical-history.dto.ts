/* eslint-disable prettier/prettier */
import { IsArray, IsOptional } from "class-validator";
import { CreateConsultationDto } from "src/consultations/dto/create-consultation.dto";
import { CreateDocumentDto } from "src/documents/dto/create-document.dto";

export class CreateMedicalHistoryDto {
    @IsOptional()
    @IsArray()
    documents: CreateDocumentDto[];

    @IsOptional()
    @IsArray()
    consultations: CreateConsultationDto[];
}
