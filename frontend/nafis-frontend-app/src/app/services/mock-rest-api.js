const express = require("express");
const mqtt = require("mqtt");
const app = express();

const url = "57d47d2b474d48ad806b06efb6258e7a.s1.eu.hivemq.cloud";
const port = 8883;

const options = {
  host: "57d47d2b474d48ad806b06efb6258e7a.s1.eu.hivemq.cloud", // Replace with your HiveMQ broker URL
  port: 8883, // Secure port for MQTT over TLS
  protocol: "mqtts", // Secure MQTT protocol
  username: "khalilos", // Replace with your HiveMQ username
  password: "THEbattle8080", // Replace with your HiveMQ password
};

let temperatureData = []; // Array to accumulate temperature data

// Connect to MQTT broker
const client = mqtt.connect(url, options);
client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("healthcare/temperature");
});

client.on("message", (topic, message) => {
  if (topic === "healthcare/temperature") {
    const newTemperature = JSON.parse(message.toString()).temperature;
    temperatureData.push({
      temperature: newTemperature,
      timestamp: new Date().toLocaleTimeString(),
    }); // Add timestamp
  }
});

// REST API endpoint
app.get("/temperature", (req, res) => {
  if (temperatureData.length > 0) {
    res.json(temperatureData); // Send the entire array of temperature data
  } else {
    res.status(503).send("No data available");
  }
});

app.listen(port, () => {
  console.log(`Mock REST API listening at ${url}`);
});
