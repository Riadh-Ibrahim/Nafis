import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { ConstantesVitales } from '../constantes-vitales/entities/constantes-vitale.entity';
import { ConstantesVitalesService } from '../constantes-vitales/constantes-vitales.service';
import { MetricsModule } from '../metrics/metrics.module';
import { AlertesModule } from 'src/alerte/entities/alerte.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConstantesVitales]), 
    MetricsModule,
    AlertesModule
  ],
  providers: [MqttService, ConstantesVitalesService],
  controllers: [MqttController],
  exports: [MqttService]
})
export class MqttModule {}