const knex = require('../database');
const irrigationSettingServicce = require("../services/irrigationSettingService");


async function returnConfigValues (irrigationId){
        const configSensorUmidade = await knex('configSensor')
            .select('value')
            .where({
                sensorId: knex('sensor').select('id').where({ name: 'Umidade' }),
                irrigationId: irrigationId
            }).first();

        const configSensorAgua = await knex('configSensor')
            .select('value')
            .where({
                sensorId: knex('sensor').select('id').where({ name: 'NivelAgua' }),
                irrigationId: irrigationId
            }).first();

        if (!configSensorUmidade || !configSensorAgua) {
            throw new Error('A configuração do sensor não foi encontrada!');
        }

        return { configHumidityValue: configSensorUmidade.value, configWaterValue: configSensorAgua.value}
}

async function verifyMeasurements(humidityValue, waterValue, configHumidityValue, configWaterValue){
    if (parseFloat(humidityValue) < parseFloat(configHumidityValue)){
        if (parseFloat(waterValue) < parseFloat(configWaterValue)){
            return "Sua planta precisa ser irrigada, mas o reservatório está com pouca água!";
        }
    } else if (parseFloat(waterValue) < parseFloat(configWaterValue)){
        return "O reservatório está baixo! Isso impedirá a sua planta de ser irrigada caso precise.";
    }

    return "Tudo certo!";
    
}

module.exports = {
    async lastMeasures (userId, gardenUserId, gardenIrrigationId, gardenId) {
        if (userId !== gardenUserId){
            throw new Error("Esta horta não pertence a você!");
        }

        let lastMeasures = [];
        const sensors = await knex('sensor').select('id');
        
        for(i=0; i<sensors.length; i++) {
            const lastMeasure = await knex('measurement').select('*').where({gardenId, sensorId: sensors[i].id}).orderBy('date','desc').first();
            lastMeasures.push(lastMeasure);
        }

        let { configHumidityValue, configWaterValue } = await returnConfigValues(gardenIrrigationId);
        let message = await verifyMeasurements(lastMeasures[0].measurement, lastMeasures[1].measurement, configHumidityValue, configWaterValue);
        lastMeasures.push({message: message});

        return lastMeasures;
    },

    async lastMeasuresAllGardens(gardens) {
        let lastMeasures = [];
        let lastMeasuresGardens = gardens;
        const sensors = await knex('sensor').select('id');

        for(i=0; i<gardens.length; i++) {
            for(j=0; j<sensors.length; j++) {
                const meausures = await knex('measurement').select('*').where({gardenId: gardens[i].id, sensorId: sensors[j].id}).orderBy('date','desc').first();
                if (meausures){lastMeasures.push(meausures)}
            }
            lastMeasuresGardens[i].lastMeasures = []
        }
        
        for(i=0; i<lastMeasuresGardens.length; i++){
            for(j=0; j<lastMeasures.length; j++){
                if (lastMeasuresGardens[i].id == lastMeasures[j].gardenId){
                    lastMeasuresGardens[i].lastMeasures.push(lastMeasures[j]);
                }
            }
        }

        for (const obj of lastMeasuresGardens) {
            if (obj.lastMeasures.length) {
                let { configHumidityValue, configWaterValue } = await returnConfigValues(obj.irrigationId);
                let message = await verifyMeasurements(obj.lastMeasures[0].measurement, obj.lastMeasures[1].measurement, configHumidityValue, configWaterValue);
                obj.message = message;
                let irrigationSetting = await irrigationSettingServicce.getOneSetting(obj.irrigationId);
                obj.settingName = irrigationSetting.name;
            }
        }

        return lastMeasuresGardens;
        
    }
}
