import { Controller, Get, Param } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Get('publish/:topic/:message')

  publishMessage(@Param('topic') topic: string, @Param('message') message: string) {
    this.mqttService.publishMessage(topic, message);
    return { message: `Published to ${topic}` };
  }

 
  @Get('alert/:patientId')
  async analyzeAndAlert(@Param('patientId') patientId: string) {
    try {
    
      await this.mqttService.handleAlert(+patientId);
      return { message: `Alertes traitées pour le patient ${patientId}` };
    } catch (error) {
      console.error('Erreur lors du traitement de l\'alerte:', error);
      return { message: `Erreur lors du traitement de l'alerte pour le patient ${patientId}` };
    }
  }
}
