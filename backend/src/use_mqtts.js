require('dotenv').config();

const mqttProtocol = process.env.MQTT_PROTOCOL;
const mqttHost = process.env.MQTT_HOST;
const mqttPort = process.env.MQTT_PORT;
const mqttUsername = process.env.MQTT_USERNAME;
const mqttPassword = process.env.MQTT_PASSWORD;

const connectOptions = {
  protocol: mqttProtocol,
  port: mqttPort,
  host: mqttHost,
  username: mqttUsername,
  password: mqttPassword,
}

module.exports = {
  connectOptions,
}