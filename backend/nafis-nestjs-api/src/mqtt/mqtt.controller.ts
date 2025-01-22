import { Controller, Get } from "@nestjs/common";
import { MqttService } from "./mqtt.service";

@Controller('mqtt')
export class MqttController {
    constructor(private readonly mqttService: MqttService) {}

    @Get('publish')
    publish() {
        const topic = 'topic';
        const message = 'message';

        this.mqttService.publish(topic, message);
        return `message ${message} published to topic ${topic}`;
    }
}