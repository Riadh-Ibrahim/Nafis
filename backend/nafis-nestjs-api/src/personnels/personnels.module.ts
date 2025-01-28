import { Module, forwardRef } from '@nestjs/common';
import { PersonnelsService } from './personnels.service';
import { PersonnelsController } from './personnels.controller';
import { Personnel } from './entities/personnel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresencesModule } from 'src/presences/presences.module';
import { ConsultationsModule } from 'src/consultations/consultations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Personnel]),
    PresencesModule, // Handle potential circular dependency
    forwardRef(() => ConsultationsModule), // Handle potential circular dependency
  ],
  controllers: [PersonnelsController],
  providers: [PersonnelsService],
  exports: [PersonnelsService], // Export service if needed elsewhere
})
export class PersonnelsModule {}
