import { Module } from '@nestjs/common';
import { PresencesService } from './presences.service';
import { PresencesController } from './presences.controller';

@Module({
  controllers: [PresencesController],
  providers: [PresencesService],
})
export class PresencesModule {}
