const knex = require('../database');

module.exports = {
    async getSettings() {
        return await knex('irrigationSetting').select('*');
    },
    async getOneSetting(id) {
        //const setting = await knex('irrigationSetting').select('*').join('configSensor', 'irrigationSetting.id', '=', 'configSensor.irrigationId').where({ id });
        const setting = await knex('irrigationSetting').select('*').where({ id }).first();
        if (!setting){throw new Error('Esta config não existe')};

        //const finalSetting = Object.assign(setting[0], setting[1])

        const humidity = await knex('configSensor').select('value').where({irrigationId: setting.id, sensorId: 1}).first();
        const water = await knex('configSensor').select('value').where({irrigationId: setting.id, sensorId: 2}).first();

        setting.humidityValue = humidity.value
        setting.waterValue = water.value

        return setting;
    },
    async createIrrigationSetting(name, userId, humidityValue, waterValue) {
        

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
        
        const settingInfo = await this.getOneSetting(id);

        if (myId != settingInfo.userId){throw new Error("Você só pode atualizar sua própria config")}
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

        const deleteValues = await knex('configSensor').where({irrigationId: settingId}).del();

        if (!deleteValues){throw new Error('Erro ao apagar valores da configuração!')}

        const deleteName = await knex('irrigationSetting').where({ id: settingId }).del();

        if (!deleteName){throw new Error('Erro ao apagar nome da configuração!')}

        return 'Configuração apagada com sucesso!'
      
      }

};
