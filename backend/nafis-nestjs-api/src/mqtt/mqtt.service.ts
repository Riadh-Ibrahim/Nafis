import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { ConstantesVitalesService } from '../constantes-vitales/constantes-vitales.service'; // Importez votre service des constantes vitales

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;

  constructor(private readonly constantesVitalesService: ConstantesVitalesService) {}

  onModuleInit() {
    
    this.client = mqtt.connect('mqtt://localhost:1883'); 

    this.client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      
      this.client.subscribe('my/test/topic', (err) => {
        if (err) {
          console.log('Subscription error:', err);
        }
      });
    });

    
    this.client.on('message', (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
    });
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
    }
  }

 
  publishMessage(topic: string, message: string) {
    this.client.publish(topic, message, { qos: 1 }, (err) => {
      if (err) {
        console.log('Publish error:', err);
      } else {
        console.log(`Message "${message}" published to topic "${topic}"`);
      }
    });
  }

  
  async handleAlert(patientId: number) {
    
    const alertes = await this.constantesVitalesService.analyzeConstantes(patientId);

    
    if (alertes && alertes.length > 0) {
      const message = `Alertes détectées pour le patient ${patientId}: ${alertes.join(', ')}`;
      this.publishMessage(`alertes/patient/${patientId}`, message);
    }
  }
}
