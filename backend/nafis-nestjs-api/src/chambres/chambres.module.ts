import { Module } from '@nestjs/common';
import { ChambresService } from './chambres.service';
import { ChambresController } from './chambres.controller';

@Module({
  controllers: [ChambresController],
  providers: [ChambresService],
})
export class ChambresModule {}
