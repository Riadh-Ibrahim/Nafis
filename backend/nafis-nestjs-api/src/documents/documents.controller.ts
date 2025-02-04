/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

/*@Controller('patients/:patientId/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  async create(@Param("patientId") patientId: number, @Body() createDocumentDto: CreateDocumentDto) {
    return await this.documentsService.create(patientId, createDocumentDto);
  }

  @Get()
  async findAll() {
    return await this.documentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.documentsService.findOne(id);
  }

  @Patch(':id')
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateDocumentDto: UpdateDocumentDto
  ) {
    return this.documentsService.update({ id: +id, updateDocumentDto });
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }
}
*/