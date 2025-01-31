import { forwardRef, Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { PatientsModule } from 'src/patients/patients.module';
import { ConsultationsModule } from 'src/consultations/consultations.module';
import { DocumentsModule } from 'src/documents/documents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalHistory]),
    forwardRef(() => PatientsModule),
    forwardRef(() => ConsultationsModule),
    forwardRef(() => DocumentsModule)
  ],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService],
  exports: [MedicalHistoryService]
})
export class MedicalHistoryModule {}