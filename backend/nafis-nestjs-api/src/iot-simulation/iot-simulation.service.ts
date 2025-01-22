// src/iot-simulator/iot-simulator.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MqttService } from '../mqtt/mqtt.service';
import { CreateConstantesVitalesDto } from 'src/constantes-vitales/dto/create-constantes-vitale.dto';
@Injectable()
export class IoTSimulatorService {
  private readonly patients = [1, 2, 3];
  private readonly ALERT_THRESHOLDS = {
    temperature: { min: 36.5, max: 38.5 },
    frequenceCardiaque: { min: 60, max: 100 },
    saturationOxygene: { min: 95, max: 100 },
  };

  constructor(private readonly mqttService: MqttService) {}

  private generateVitalSigns(patientId: number): CreateConstantesVitalesDto {
    const vitalSigns = {
      patientId,
      timestamp: new Date(),
      temperature: this.generateRandomNumber(36, 40, 1),
      tensionArterielle: `${this.generateRandomNumber(90, 140)}/
        ${this.generateRandomNumber(60, 90)}`,
      frequenceCardiaque: Math.round(this.generateRandomNumber(60, 100)),
      saturationOxygene: Math.round(this.generateRandomNumber(90, 100)),
    };

    if (this.isAbnormal(vitalSigns)) {
      this.mqttService.handleAlert(patientId);
    }

    return vitalSigns;
  }

  private generateRandomNumber(min: number, max: number, decimals = 0): number {
    const random = Math.random() * (max - min) + min;
    return Number(random.toFixed(decimals));
  }

  private isAbnormal(vitals: CreateConstantesVitalesDto): boolean {
    return (
      vitals.temperature < this.ALERT_THRESHOLDS.temperature.min ||
      vitals.temperature > this.ALERT_THRESHOLDS.temperature.max ||
      vitals.frequenceCardiaque < this.ALERT_THRESHOLDS.frequenceCardiaque.min ||
      vitals.frequenceCardiaque > this.ALERT_THRESHOLDS.frequenceCardiaque.max ||
      vitals.saturationOxygene < this.ALERT_THRESHOLDS.saturationOxygene.min
    );
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  simulateVitalSigns() {
    this.patients.forEach(patientId => {
      const vitalSigns = this.generateVitalSigns(patientId);
      const topic = `vitals/patient/${patientId}`;
      this.mqttService.publishMessage(topic, JSON.stringify(vitalSigns));
    });
  }

  async simulateAbnormalVitals(patientId: number) {
    const abnormalVitals: CreateConstantesVitalesDto = {
      patientId,
      timestamp: new Date(),
      temperature: 39.5,
      tensionArterielle: '150/95',
      frequenceCardiaque: 120,
      saturationOxygene: 88,
    };

    const topic = `vitals/patient/${patientId}`;
    this.mqttService.publishMessage(topic, JSON.stringify(abnormalVitals));
    await this.mqttService.handleAlert(patientId);
  }
}