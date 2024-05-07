require('dotenv').config();

const mqttService = require('../services/mqttService.js')
const client = mqttService.createMqttClient(); 

const topicMedida = 'Horta/Medida';
const topicEstadoMotor = 'Outros/Estado_Motor';
const qos = 0

// Conecta ao broker e se inscreve nos tópicos
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

// Recebe mensagens dos tópicos inscritos
client.on('message', async (topic, message, packet) => { 
  console.log("Mensagem recebida!")
  if(topic === topicMedida) { 
    try {
      const stringMessage = message.toString();
      console.log('Conteúdo:', stringMessage);
      await mqttService.insertData(stringMessage);
      await mqttService.checkAndSendIrrigationMessage(stringMessage, client);
    } catch (error) {
      console.error('Erro: ', error);
    }
  } else if (topic === topicEstadoMotor) {
    const motorStatus = message.toString();
    const parts = motorStatus.split(',').map(part => part.replace(/["']/g, ''));

    if (parts.length === 2 && parts[1] === '1') {
        try {
            const identificador = parts[0];

            await mqttService.recordIrrigationHistory(identificador);
        } catch (error) {
            console.error('Erro ao registrar o histórico de irrigação: ', error);
        }
    }
  }
});