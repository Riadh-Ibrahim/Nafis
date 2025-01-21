import { Module } from '@nestjs/common';
import { RendezVousService } from './rendez-vous.service';
import { RendezVousController } from './rendez-vous.controller';

@Module({
  controllers: [RendezVousController],
  providers: [RendezVousService],
})
export class RendezVousModule {}
