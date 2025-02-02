import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertesService } from '../alerte.service';
import { AlertesController } from '../alerte.controller';
import { Alerte } from './alerte.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Alerte])],
  controllers: [AlertesController],
  providers: [AlertesService],
  exports: [AlertesService],
})
export class AlertesModule {}
