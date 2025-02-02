import { forwardRef, Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from './entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsService } from 'src/patients/patients.service';
import { PatientsModule } from 'src/patients/patients.module';
import { MedicalHistoryModule } from 'src/medical-history/medical-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    forwardRef(() => PatientsModule),
    forwardRef(() => MedicalHistoryModule),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService]  // Add this export
})
export class DocumentsModule {}