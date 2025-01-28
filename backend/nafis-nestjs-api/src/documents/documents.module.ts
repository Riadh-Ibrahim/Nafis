import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from './entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsService } from 'src/patients/patients.service';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Document]),
      PatientsModule
    ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
