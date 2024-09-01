const knex = require('../database');
const { UnauthorizedGardenReturn } = require('../errors/gardenError');
const { SensorConfigurationNotFound } = require('../errors/measurementError');
const irrigationSettingServicce = require("../services/irrigationSettingService");


// Retorna os valores de uma configuração de irrigação de acordo com o id passado
async function returnConfigValues (irrigationId){
        const configSensorUmidade = await knex('configSensor')
            .select('value')
            .where({
                sensorId: knex('sensor').select('id').where({ name: 'Umidade' }),
                irrigationId: irrigationId
            }).first();

        if (!configSensorUmidade) {
            throw new SensorConfigurationNotFound()
        }

        return { configHumidityValue: configSensorUmidade.value }
}

// Realiza a verificação do estado da horta
async function verifyMeasurements(humidityValue, configHumidityValue){
    if (parseFloat(humidityValue) < parseFloat(configHumidityValue)){
        return "Nível de umidade baixo. Sua planta precisa ser irrigada!";
    }

    return "Tudo certo!";
    
}

module.exports = {
    async lastMeasures (userId, gardenUserId, gardenIrrigationId, gardenId) {
        if (userId !== gardenUserId){
            throw new UnauthorizedGardenReturn();
        }

        let lastMeasures = [];
        const sensors = await knex('sensor').select('id');
        
        // Para cada sensor, busca a última medida registrada na tabela measurement 
        for(i=0; i<sensors.length; i++) {
            const lastMeasure = await knex('measurement').select('*').where({gardenId, sensorId: sensors[i].id}).orderBy('date','desc').first();
            lastMeasures.push(lastMeasure);
        }

        // Busca a configuração de irrigação ativa da horta em questão
        let { configHumidityValue } = await returnConfigValues(gardenIrrigationId);

        // Verifica o status/mensagem da horta de acordo com as últimas medidas
        let message = await verifyMeasurements(lastMeasures[0].measurement, configHumidityValue);
        lastMeasures.push({message: message});

        return lastMeasures;
    },

    async lastMeasuresAllGardens(gardens) {
        try {
            console.log('Iniciando lastMeasuresAllGardens');    
            let lastMeasures = [];
            let lastMeasuresGardens = gardens;
            const sensors = await knex('sensor').select('id');

            // Busca as últimas medidas de todos os sensores de cada horta de um usuário
            for(i=0; i<gardens.length; i++) {
                for(j=0; j<sensors.length; j++) {
                    const meausures = await knex('measurement').select('*').where({gardenId: gardens[i].id, sensorId: sensors[j].id}).orderBy('date','desc').first();
                    if (meausures){lastMeasures.push(meausures)}
                }
                lastMeasuresGardens[i].lastMeasures = []
            }

            // Coloca todas as últimas medidas dos sensores em sua respectiva horta
            for(i=0; i<lastMeasuresGardens.length; i++){
                for(j=0; j<lastMeasures.length; j++){
                    if (lastMeasuresGardens[i].id == lastMeasures[j].gardenId){
                        lastMeasuresGardens[i].lastMeasures.push(lastMeasures[j]);
                    }
                }
            }

            // Caso o usuário tenha hortas com medidas, insere o status da horta e o nome da configuração de irrigação usada por ela 
            for (const obj of lastMeasuresGardens) {
                if (obj.lastMeasures.length) {
                    let { configHumidityValue } = await returnConfigValues(obj.irrigationId);
                    let message = await verifyMeasurements(obj.lastMeasures[0].measurement, configHumidityValue);
                    obj.message = message;
                    let irrigationSetting = await irrigationSettingServicce.getOneSetting(obj.irrigationId, obj.userId);
                    obj.settingName = irrigationSetting.name;
                }
            }

            return lastMeasuresGardens;
        } catch (error) {
            console.log('Erro capturado:', error);
            throw new Error('Database error');
        }
    }
}
