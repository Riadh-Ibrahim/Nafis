import { Module } from '@nestjs/common';
import { PresencesService } from './presences.service';
import { PresencesController } from './presences.controller';
import { Presence } from './entities/presence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([Presence]) 
    ],
  controllers: [PresencesController],
  providers: [PresencesService],
  exports: [PresencesService],
})
export class PresencesModule {}
