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

module.exports = {
    async insertData(data){

        const { identificador, sensor, medida } = data;

        const garden = await knex('garden').select("id").where({identifier: identificador}).first();

        if (!garden){throw new Error('O identificador informado não pertence a uma horta!');}

        let sensorId = sensor === "Umidade" ? 1 : 2;
        
        await knex('measurement').insert({
            measurement: medida,
            date: knex.fn.now(),
            sensorId: sensorId,
            gardenId: garden.id
        });
    },

    async checkAndSendIrrigationMessage(data){

        const { identificador, sensor, medida } = data;
        console.log(medida)
        const garden = await knex('garden')
            .select('id', 'configId')
            .where({identifier: identificador})
            .first();

        if (!garden) {
            throw new Error('O identificador informado não pertence a uma horta!');
        }

        const configSensor = await knex('configSensor')
            .select('value')
            .where({
                sensorId: knex('sensor').select('id').where({name: sensor}),
                irrigationId: garden.configId
            })
            .first();
        
        if (!configSensor){
            throw new Error('A configuração do sensor não foi encontrada!');
        }

        if (parseFloat(medida) < parseFloat(configSensor.value)) {
            // Enviar mensagem para o mesmo tópico indicando que a planta deve ser irrigada
            const client = createMqttClient();

            const topicName = 'Outros/Estado_Motor';
            const payload = `{"identificador": "${identificador}", "mensagem": "Planta precisa ser irrigada!"}`;
            const qos = 0;

            client.on('connect', () => {
                console.log(`${client.options.protocol}: Connected`);
                client.publish(topicName, payload, { qos }, (error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
        }
    },

    createMqttClient,
};