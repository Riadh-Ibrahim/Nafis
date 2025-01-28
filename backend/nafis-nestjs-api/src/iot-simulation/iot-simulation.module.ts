import { Module } from '@nestjs/common';
import { IoTSimulatorService } from './iot-simulation.service';
import { IoTSimulatorController } from './iot-simulation.controller';
import { MqttModule } from 'src/mqtt/mqtt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  
  imports: [
    MqttModule,
     
    ],
  providers: [IoTSimulatorService],
  controllers: [IoTSimulatorController],
})
export class IoTSimulatorModule {}