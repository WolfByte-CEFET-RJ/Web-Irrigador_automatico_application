require('dotenv').config();

const mqttService = require('../services/mqttService.js')
const client = mqttService.createMqttClient(); 

const topicName = 'Horta/Medida'
const qos = 0

// connect to same client and subscribe to same topic name  
client.on('connect', () => { 
  console.log(`${client.options.protocol}: Connected`)
  client.subscribe(topicName, {qos}, (err, granted) => { 
      if(err) { 
          console.log(err, 'err'); 
      } 
      console.log(granted, 'granted') 
  });
});

// on receive message event
client.on('message', async (topic, message, packet) => { 
  console.log("Mensagem recebiba!")
  if(topic === topicName) { 
    try {
      const jsonMessage = JSON.parse(message);
      console.log('Conteudo:', jsonMessage);
      await mqttService.insertData(jsonMessage);
      await mqttService.checkAndSendIrrigationMessage(jsonMessage);
    } catch (error) {
      console.error('Erro: ', error);
      console.log('Conteúdo da mensagem:', message.toString());
    }
  } 
});