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
  
  async create(createDocumentDto: CreateDocumentDto) {
    const document=this.documentsRepository.create(createDocumentDto);
    return await this.documentsRepository.save(document);
  }

  async findAll() {
    return await this.documentsRepository.find();
  }

  async findOne(id: number) {
    return await this.documentsRepository.findOne({where: {id}});
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    const document=await this.findOne(id);
    if(!document){
      throw new NotFoundException();
    }
    Object.assign(document,updateDocumentDto);
    return await this.documentsRepository.save(document);
  }

  async remove(id: number) {
    const document=await this.findOne(id);
    if(!document){
      throw new NotFoundException();
    }
    return await this.documentsRepository.remove(document);
  }
}
