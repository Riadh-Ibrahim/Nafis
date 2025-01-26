import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from './create-document.dto';
import { IsNegative, IsNumber } from 'class-validator';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
    @IsNumber()
    @IsNegative()
    documentId: number;
}
