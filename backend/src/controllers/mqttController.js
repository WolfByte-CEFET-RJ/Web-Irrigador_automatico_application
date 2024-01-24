require('dotenv').config();

const mqttService = require('../services/mqttService.js')
const client = mqttService.createMqttClient(); 

const topicMedida = 'Horta/Medida';
const topicEstadoMotor = 'Outros/Estado_Motor';
const qos = 0

// connect to same client and subscribe to same topic name  
client.on('connect', () => { 
  console.log(`${client.options.protocol}: Connected`)
  client.subscribe(topicMedida, {qos}, (err, granted) => { 
      if(err) { 
          console.log(err, 'err'); 
      } 
      console.log(granted, 'granted') 
  })
  client.subscribe(topicEstadoMotor, {qos}, (err, granted) => { 
    if(err) { 
        console.log(err, 'err'); 
    } 
    console.log(granted, 'granted')
  })
});

// on receive message event
client.on('message', async (topic, message, packet) => { 
  console.log("Mensagem recebiba!")
  if(topic === topicMedida) { 
    try {
      const stringMessage = message.toString();
      console.log('Conteudo:', stringMessage);
      await mqttService.insertData(stringMessage);
      await mqttService.checkAndSendIrrigationMessage(stringMessage, client);
    } catch (error) {
      console.error('Erro: ', error);
    }
  } else if (topic === topicEstadoMotor) {
    const motorStatus = message.toString();
    const parts = motorStatus.split(',').map(part => part.replace(/["']/g, ''));

    if (parts.length === 1) {
        try {
            const identificador = parts[0];

            await mqttService.recordIrrigationHistory(identificador);
            console.log('Histórico de irrigação registrado com sucesso!');
        } catch (error) {
            console.error('Erro ao registrar o histórico de irrigação: ', error);
        }
    } else {
        console.error('Formato de mensagem inválido!');
    }
  }
});