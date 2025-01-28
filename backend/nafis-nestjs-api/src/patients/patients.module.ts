import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([Patient]) 
    ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
