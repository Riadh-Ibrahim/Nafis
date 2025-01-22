import { Module } from '@nestjs/common';
import { PersonnelsService } from './personnels.service';
import { PersonnelsController } from './personnels.controller';

@Module({
  controllers: [PersonnelsController],
  providers: [PersonnelsService],
})
export class PersonnelsModule {}
