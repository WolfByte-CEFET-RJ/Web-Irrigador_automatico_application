require('dotenv').config();
const mqtt = require('mqtt')
//const client = mqtt.connect("mqtt://localhost") 

const { connectOptions } = require('../use_mqtts.js')
const clientId = 'teste_nodejs_' + Math.random().toString(16).substring(2, 8)
const options = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'backend',
  password: 'backend123',
  reconnectPeriod: 1000,
  rejectUnauthorized: true,
}

const {protocol, host, port} = connectOptions

let connectUrl = `${protocol}://${host}:${port}`

const client = mqtt.connect(connectUrl, options)

const topicName = 'test/sensor'
const payload = '{"message": "Hello World"}'
const qos = 0

// connect to same client and subscribe to same topic name  
client.on('connect', () => { 
  console.log(`${protocol}: Connected`)
  client.subscribe(topicName, {qos}, (err, granted) => { 
      if(err) { 
          console.log(err, 'err'); 
      } 
      console.log(granted, 'granted') 

      client.publish(topicName, payload, { qos }, (error) => {
        if (error) {
          console.error(error)
        }
      })
  }) 
}) 


// on receive message event
client.on('message', (topic, message, packet) => { 
  //console.log(packet, packet.payload.toString()); 
  console.log("Mensagem recebiba!")
  if(topic === topicName) { 
    try {
      const jsonMessage = JSON.parse(message);
      console.log('Conteudo:', jsonMessage)
    } catch (error) {
      console.error('Erro ao analisar a mensagem como JSON:', error);
      console.log('Conteúdo da mensagem:', message.toString());
    }
  } 
}) 