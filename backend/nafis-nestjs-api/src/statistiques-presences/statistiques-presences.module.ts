import { Module } from '@nestjs/common';
import { StatistiquesPresencesService } from './statistiques-presences.service';
import { StatistiquesPresencesController } from './statistiques-presences.controller';
import { StatistiquesPresence } from './entities/statistiques-presence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongeDetail } from './entities/conge-detail.entity';
import { AbsenceDetail } from './entities/absence-detail.entity';
import { MissionDetail } from './entities/mission-detail.entity';
import { PresencesModule } from 'src/presences/presences.module';
@Module({
  imports: [
      TypeOrmModule.forFeature([StatistiquesPresence,CongeDetail,AbsenceDetail,MissionDetail]) ,
      PresencesModule
    ],
  controllers: [StatistiquesPresencesController],
  providers: [StatistiquesPresencesService],
})
export class StatistiquesPresencesModule {}
