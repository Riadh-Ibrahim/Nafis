import { Injectable } from '@nestjs/common';
import { Gauge, Counter, Registry } from 'prom-client';

@Injectable()
export class VitalsMetricsService {
  private registry: Registry;
  private temperatureGauge: Gauge;
  private heartRateGauge: Gauge;
  private oxygenSaturationGauge: Gauge;
  private bloodPressureGauge: Gauge;
  private anomaliesCounter: Counter;

  constructor() {
    this.registry = new Registry();
    
    this.temperatureGauge = new Gauge({
      name: 'patient_temperature',
      help: 'Patient body temperature',
      labelNames: ['patient_id'],
      registers: [this.registry]
    });

    this.heartRateGauge = new Gauge({
      name: 'patient_heart_rate',
      help: 'Patient heart rate',
      labelNames: ['patient_id'],
      registers: [this.registry]
    });

    this.oxygenSaturationGauge = new Gauge({
      name: 'patient_oxygen_saturation',
      help: 'Patient oxygen saturation',
      labelNames: ['patient_id'],
      registers: [this.registry]
    });

    this.bloodPressureGauge = new Gauge({
      name: 'patient_blood_pressure',
      help: 'Patient blood pressure',
      labelNames: ['patient_id', 'type'],
      registers: [this.registry]
    });

    this.anomaliesCounter = new Counter({
      name: 'patient_vitals_anomalies',
      help: 'Number of vitals anomalies detected',
      labelNames: ['patient_id', 'type'],
      registers: [this.registry]
    });
  }

  recordVitals(patientId: number, vitals: any) {
    this.temperatureGauge.labels(patientId.toString()).set(vitals.temperature);
    this.heartRateGauge.labels(patientId.toString()).set(vitals.frequenceCardiaque);
    this.oxygenSaturationGauge.labels(patientId.toString()).set(vitals.saturationOxygene);
    
    const [systolic, diastolic] = vitals.tensionArterielle.split('/').map(Number);
    this.bloodPressureGauge.labels(patientId.toString(), 'systolic').set(systolic);
    this.bloodPressureGauge.labels(patientId.toString(), 'diastolic').set(diastolic);
  }

  recordAnomaly(patientId: number, type: string) {
    this.anomaliesCounter.labels(patientId.toString(), type).inc();
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}