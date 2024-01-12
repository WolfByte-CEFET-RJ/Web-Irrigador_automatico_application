const knex = require('../database');
const mqtt = require('mqtt');
const { connectOptions } = require('../use_mqtts.js');

function createMqttClient() {
    const clientId = 'teste_nodejs_' + Math.random().toString(16).substring(2, 8);
    const options = {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: 'backend',
        password: 'backend123',
        reconnectPeriod: 1000,
        rejectUnauthorized: true,
    };

    const { protocol, host, port } = connectOptions;
    const connectUrl = `${protocol}://${host}:${port}`;

    return mqtt.connect(connectUrl, options);
}

function extractValuesFromString(message) {
    const [identificador, valorUmidade, valorAgua] = message.split(',');
    return { identificador, valorUmidade, valorAgua };
}

module.exports = {
    async insertData(data){
        const {identificador, valorUmidade, valorAgua} = extractValuesFromString(data);

        const garden = await knex('garden').select("id").where({identifier: identificador}).first();

        if (!garden){throw new Error('O identificador informado não pertence a uma horta!');}

        const date = new Date();
        
        await knex('measurement').insert([
            {measurement: valorUmidade, date, sensorId: 1, gardenId: garden.id},
            {measurement: valorAgua, date, sensorId: 2, gardenId: garden.id}
        ]);
    },

    async checkAndSendIrrigationMessage(data, mqttClient){
        const {identificador, valorUmidade, valorAgua} = extractValuesFromString(data);
        
        console.log(`Nível de Umidade: ${valorUmidade}, Nível da Água: ${valorAgua}`)
        
        const garden = await knex('garden')
            .select('id', 'configId')
            .where({identifier: identificador})
            .first();

        if (!garden) {
            throw new Error('O identificador informado não pertence a uma horta!');
        }

        const configSensorUmidade = await knex('configSensor')
            .select('value')
            .where({
                sensorId: knex('sensor').select('id').where({ name: 'Umidade' }),
                irrigationId: garden.configId
            })
            .first();

        const configSensorAgua = await knex('configSensor')
            .select('value')
            .where({
                sensorId: knex('sensor').select('id').where({ name: 'NivelAgua' }),
                irrigationId: garden.configId
            })
            .first();

        if (!configSensorUmidade || !configSensorAgua) {
            throw new Error('A configuração do sensor não foi encontrada!');
        }

        if (parseFloat(valorUmidade) < parseFloat(configSensorUmidade.value)) {
            if (parseFloat(valorAgua) >= parseFloat(configSensorAgua.value)) {
                // Enviar mensagem para o mesmo tópico indicando que a planta deve ser irrigada
                const topicName = 'Outros/Estado_Motor';
                const payload = `{"identificador": "${identificador}", "mensagem": "Planta precisa ser irrigada!"}`;
                const qos = 0;

                mqttClient.publish(topicName, payload, { qos }, (error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            } else {
                // Avisar ao front-end que precisa encher o reservatório de água
                console.log('Nível de água no reservatório está baixo. Avisar ao front-end para encher o reservatório.');
            }
        } else if (parseFloat(valorAgua) < parseFloat(configSensorAgua.value)) {
            // Avisar ao front-end que precisa encher o reservatório de água
            console.log('Nível de água no reservatório está baixo. Avisar ao front-end para encher o reservatório.');
        }
    },

    createMqttClient,
};