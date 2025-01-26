/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>){}
  
  async addDocument(createDocumentDto: CreateDocumentDto) {
    const document=this.documentsRepository.create(createDocumentDto);
    return await this.documentsRepository.save(document);
  }

  async findAll() {
    return await this.documentsRepository.find();
  }

  async findOne(id: number) {
    return await this.documentsRepository.findOne({where: {id}});
  }

  async updateDocument(updateDocumentDto: UpdateDocumentDto) {
    const document = await this.documentsRepository.findOne({ where: { 
      id: updateDocumentDto.documentId
     } });
    if(!document){
      throw new NotFoundException();
    }
    Object.assign(document,updateDocumentDto);
    return await this.documentsRepository.save(document);
  }

  async removeDocument(documentId: number) {
    const document=await this.findOne(documentId);
    if(!document){
      throw new NotFoundException();
    }
    return await this.documentsRepository.remove(document);
  }
}
