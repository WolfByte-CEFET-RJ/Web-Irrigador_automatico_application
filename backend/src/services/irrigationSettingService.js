const knex = require('../database');
const yup = require('yup');

const settingSchema = yup.object().shape({
    name: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres').required(), 
    userId: yup.number().integer().positive().required(),
    humidityValue: yup.string().required(), 
    waterValue: yup.string().required()
  });

  const updateSettingSchema = yup.object().shape({
    name: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres'), 
    userId: yup.number().integer().positive(),
    humidityValue: yup.string(), 
    waterValue: yup.string()
  });
module.exports = {
    async getSettings() {
        const settings = await knex('irrigationSetting')
        .select(
            'irrigationSetting.id as id',
            'irrigationSetting.name as name',
            'irrigationSetting.userId as userId',
            knex.raw('JSON_ARRAYAGG(JSON_OBJECT(\'sensorId\', configSensor.sensorId, \'value\', configSensor.value)) as sensors')
        )
        .join('configSensor', 'irrigationSetting.id', '=', 'configSensor.irrigationId')
        .groupBy('irrigationSetting.id')
        .orderBy('irrigationSetting.id', 'asc');

        const finalSetting = settings.map(setting => ({
            id: setting.id,
            name: setting.name,
            userId: setting.userId,
            humidityValue: JSON.parse(setting.sensors)[0].value,
            waterValue: JSON.parse(setting.sensors)[1].value
        }))

        return finalSetting;
    },
    async getOneSetting(id) {
        const setting = await knex('irrigationSetting').select('irrigationSetting.id', 'irrigationSetting.name', 'irrigationSetting.userId', 'configSensor.value')
        .join('configSensor', 'irrigationSetting.id', '=', 'configSensor.irrigationId').where({ id });

        const finalSetting = {
            id: setting[0].id,
            name: setting[0].name,
            userId: setting[0].userId,
            humidityValue: setting[0].value,
            waterValue: setting[1].value
        }

        return finalSetting;
    },
    async createIrrigationSetting(name, userId, humidityValue, waterValue) {
        await settingSchema.validate({name, userId, humidityValue, waterValue})
        const settingInfo = await knex('irrigationSetting').where({name}).first();
        if(settingInfo){throw new Error('Já existe uma config com este nome!')}

        await knex('irrigationSetting').insert({
            name,
            userId
        });

        const irrigationId = await knex('irrigationSetting').select("id").where({ name }).first();

        await knex('configSensor').insert([
           {irrigationId: irrigationId.id, sensorId: 1, value: humidityValue},
           {irrigationId: irrigationId.id, sensorId: 2, value: waterValue}
        ])

        return "Configuração cadastrada!"
    },
    async updateIrrigationSetting(myId, id, settingData) {
        await updateSettingSchema.validate(settingData, {abortEarly: false})
        const settingInfo = await this.getOneSetting(id);

        if (myId != settingInfo.userId){throw new Error("Você só pode atualizar sua própria config")}
        if(settingInfo.id === 1){throw new Error('Você não pode alterar uma configuração padrão')}
        if(settingData.userId){throw new Error('Você não pode alterar o userId')}

        if (settingData.name){
            const settingForChange = await knex('irrigationSetting').where({ id }).update({name: settingData.name});
            if (!settingForChange){throw new Error('Esta configuração não existe')}
        }
       
        if (settingData.humidityValue){
            const humidityValue = await knex('configSensor').where({irrigationId: settingInfo.id, sensorId: 1}).update({value: settingData.humidityValue})
            if (!humidityValue){throw new Error('Erro ao alterar o valor da umidade!')}
        }

        if (settingData.waterValue){
            const waterValue = await knex('configSensor').where({irrigationId: settingInfo.id, sensorId: 2}).update({value: settingData.waterValue})
            if (!waterValue){throw new Error('Erro ao alterar o valor do nível da água!')}
        }
        
        return "Configuração atualizada com sucesso!"
    },
    async deleteIrrigationSetting(settingId, userId) {
        const setting = await this.getOneSetting(settingId); 
        if (!setting){
            throw new Error('Esta config não existe!')
        }
        if(setting.id === 1){throw new Error('Você não pode apagar uma configuração padrão')}
        if (setting.userId != userId){throw new Error('Esta config não pertence a você!')}

        const deleteValues = await knex('configSensor').where({irrigationId: settingId}).del();

        if (!deleteValues){throw new Error('Erro ao apagar valores da configuração!')}

        const deleteName = await knex('irrigationSetting').where({ id: settingId }).del();

        if (!deleteName){throw new Error('Erro ao apagar nome da configuração!')}

        return 'Configuração apagada com sucesso!'
      }
};
