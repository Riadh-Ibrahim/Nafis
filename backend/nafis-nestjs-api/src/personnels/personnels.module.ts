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
    forwardRef(() => PresencesModule),
    forwardRef(() => ConsultationsModule),
  ],
  controllers: [PersonnelsController],
  providers: [PersonnelsService],
  exports: [PersonnelsService],
})
export class PersonnelsModule {}