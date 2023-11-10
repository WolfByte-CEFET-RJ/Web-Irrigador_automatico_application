require('dotenv').config();
const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://localhost") 
const topicName = 'test/connection2' 

/*const clientId = 'emqx_nodejs_' + Math.random().toString(16).substring(2, 8)
const username = 'emqx_test'
const password = 'emqx_test'

const clientTest = mqtt.connect('mqtt://broker.emqx.io:1883', {
  clientId,
  username,
  password,
  // ...other options
})*/

// connect to same client and subscribe to same topic name  
client.on('connect', () => { 
  client.subscribe(topicName, (err, granted) => { 
      if(err) { 
          console.log(err, 'err'); 
      } 
      console.log(granted, 'granted') 
  }) 
}) 


// on receive message event
client.on('message', (topic, message, packet) => { 
  //console.log(packet, packet.payload.toString()); 
  console.log("Mensagem recebiba!")
  if(topic === topicName) { 
    try {
      const jsonMessage = JSON.parse(message);
      console.log(jsonMessage)
    } catch (error) {
      console.error('Erro ao analisar a mensagem como JSON:', error);
      console.log('Conteúdo da mensagem:', message.toString());
    }
  } 
}) 


