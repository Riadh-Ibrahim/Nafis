/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from "@nestjs/common";
import * as mqtt from "mqtt";


@Injectable()
export class MqttService implements OnModuleInit {
    private mqttClient;
    private readonly mqttUrl = process.env.MQTT_BROKER_URL;
    private readonly options : mqtt.IClientOptions = {
        port: 8883,
        protocol: 'mqtts',
        username: process.env.MQTT_BROKER_USERNAME,
        password: process.env.MQTT_BROKER_PASSWORD
    }

    onModuleInit() {
        this.mqttClient = mqtt.connect(this.mqttUrl, this.options);
        this.mqttClient.on('connect', () => {
            console.log("connected to mqtt broker");
        })
        this.mqttClient.on('error', (error) => {
            console.log(error)
        })
    }

    publish(topic: string, message: string) {
        this.mqttClient.publish(topic, message, (error) => {
            if (error) {
                console.log("Publishing the message failed");
            } else {
                console.log("Published the message successfully");
            }
        })
    }

}