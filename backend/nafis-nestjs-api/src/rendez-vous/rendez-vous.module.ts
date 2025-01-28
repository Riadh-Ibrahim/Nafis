import { Module } from '@nestjs/common';
import { RendezVousService } from './rendez-vous.service';
import { RendezVousController } from './rendez-vous.controller';
import { RendezVous } from './entities/rendez-vous.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([RendezVous]) 
    ],
  controllers: [RendezVousController],
  providers: [RendezVousService],
})
export class RendezVousModule {}
