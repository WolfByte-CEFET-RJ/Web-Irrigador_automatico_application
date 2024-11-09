const knex = require('../database');
const mqtt = require('mqtt');
const { connectOptions } = require('../use_mqtts.js');

// Função para criar um cliente MQTT
function createMqttClient() {
    const clientId = 'teste_nodejs_' + Math.random().toString(16).substring(2, 8);
    const { protocol, host, port, username, password } = connectOptions;
    
    const options = {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: username,
        password: password,
        reconnectPeriod: 1000,
        rejectUnauthorized: true,
    };

    const connectUrl = `${protocol}://${host}:${port}`;

    return mqtt.connect(connectUrl, options);
}

// Função para extrair os valores de um string
function extractValuesFromString(message) {
    const cleanedMessage = message.replace(/["\n\r\s]/g, '').trim();
    const [identificador, valorUmidade] = cleanedMessage.split(',');
        
    return { identificador, valorUmidade };
}

module.exports = {
    // Função para inserir dados no banco de dados
    async insertData(data){
        const {identificador, valorUmidade} = extractValuesFromString(data);
        
        const garden = await knex('garden').select("id").where({identifier: identificador}).first();

        if (!garden){throw new Error('O identificador informado não pertence a uma horta!');}

        const date = new Date();
        
        await knex('measurement').insert([
            {measurement: valorUmidade, date, sensorId: 1, gardenId: garden.id},
        ]);
    },

    // Função para verificar se a planta deve ser irrigada
    async checkAndSendIrrigationMessage(data, mqttClient){
        const {identificador, valorUmidade} = this.extractValuesFromString(data);

        const garden = await knex('garden')
            .select('id', 'irrigationId')
            .where({identifier: identificador})
            .first();

        if (!garden) {
            throw new Error('O identificador informado não pertence a uma horta!');
        }

        const configSensorUmidade = await knex('configSensor')
            .select('value')
            .where({
                sensorId: knex('sensor').select('id').where({ name: 'Umidade' }),
                irrigationId: garden.irrigationId
            })
            .first();


        if (!configSensorUmidade) {
            throw new Error('A configuração do sensor não foi encontrada!');
        }

        if (parseFloat(valorUmidade) < parseFloat(configSensorUmidade.value)) {
                // Enviar mensagem para o mesmo tópico indicando que a planta deve ser irrigada
            const topicName = 'Outros/Estado_Motor';
            const payload = `"${identificador}"`;
            const qos = 0;

            mqttClient.publish(topicName, payload, { qos }, (error) => {
                if (error) {
                    console.error(error);
                }
            });
        }
    },

    // Função para registrar o histórico de irrigação
    async recordIrrigationHistory(identificador) {
        const garden = await knex('garden').select('id').where({ identifier: identificador }).first();

        if (!garden) {
            throw new Error('O identificador informado não pertence a uma horta!');
        }

        await knex('irrigationHistory').insert({
            date: new Date(),
            gardenId: garden.id,
        });

        console.log('Histórico de irrigação registrado com sucesso!');
    },

    // Função para deletar o histórico de irrigação antigo
    async deleteOldIrrigationHistory() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
        await knex('irrigationHistory')
            .where('date', '<', sevenDaysAgo)
            .del();
    
        console.log('Old irrigation history records deleted.');
    },

    createMqttClient, extractValuesFromString,
};