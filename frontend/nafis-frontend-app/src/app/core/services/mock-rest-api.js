const express = require("express");
const mqtt = require("mqtt");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app); // Create an HTTP server
const wss = new WebSocket.Server({ server }); // Attach WebSocket server to HTTP server

const url = "57d47d2b474d48ad806b06efb6258e7a.s1.eu.hivemq.cloud";
const port = 8883;

const options = {
  host: url,
  port: 8883,
  protocol: "mqtts",
  username: "khalilos",
  password: "THEbattle8080",
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
    const parsedMessage = JSON.parse(message.toString());
    const temperature = parsedMessage.temperature;

    if (
      temperature !== null &&
      temperature !== undefined &&
      !isNaN(temperature)
    ) {
      // Send valid data to WebSocket clients
      wss.clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ temperature }));
        }
      });
    } else {
      console.warn("Invalid temperature received:", temperature);
    }
  }
});

// REST API endpoint
app.get("/temperature", (req, res) => {
  if (temperatureData.length > 0) {
    res.json(temperatureData);
  } else {
    res.status(503).send("No data available");
  }
});

// WebSocket server connection
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
  });

  ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
