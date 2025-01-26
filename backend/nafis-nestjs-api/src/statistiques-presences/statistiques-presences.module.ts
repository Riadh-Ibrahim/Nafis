import { Module } from '@nestjs/common';
import { StatistiquesPresencesService } from './statistiques-presences.service';
import { StatistiquesPresencesController } from './statistiques-presences.controller';

@Module({
  controllers: [StatistiquesPresencesController],
  providers: [StatistiquesPresencesService],
})
export class StatistiquesPresencesModule {}
