// src/mqtt/mqtt.module.ts
import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { ConstantesVitalesModule } from '../constantes-vitales/constantes-vitales.module';

@Module({
  imports: [ConstantesVitalesModule],
  providers: [MqttService],
  controllers: [MqttController],
  exports: [MqttService],
})
export class MqttModule {}