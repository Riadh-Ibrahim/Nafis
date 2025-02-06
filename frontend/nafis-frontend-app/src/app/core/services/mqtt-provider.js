const mqtt = require("mqtt");

// HiveMQ Cloud configuration
const options = {
  host: "57d47d2b474d48ad806b06efb6258e7a.s1.eu.hivemq.cloud", // Replace with your HiveMQ broker URL
  port: 8883, // Secure port for MQTT over TLS
  protocol: "mqtts", // Secure MQTT protocol
  username: "khalilos",
  password: "THEbattle8080",
};

// Connect to the HiveMQ Cloud broker
const client = mqtt.connect(options);

// Publish mock temperature data every second
client.on("connect", () => {
  console.log("Connected to HiveMQ broker");
  setInterval(() => {
    const temperature = (36 + Math.random() * 2).toFixed(1); // Random temperature 36.0 - 38.0
    client.publish("healthcare/temperature", JSON.stringify({ temperature }));
    console.log(`Published: ${temperature}`);
  }, 1000);
});

// Handle errors
client.on("error", (err) => {
  console.error("Connection error:", err.message);
});
