const knex = require('../database');

module.exports = {
    async getSettings() {
        return await knex('irrigationSetting').select('*');
    },
    async getOneSetting(id) {
        const setting = await knex('irrigationSetting').where({ id }).first();
        if (!setting){throw new Error('Esta config não existe')};

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
        
        const {userId} = await this.getOneSetting(id);


        if (myId != userId){throw new Error("Você só pode atualizar sua própria config")}
        if(settingData.userId){throw new Error('Você não pode alterar o userId')}


        const setting = await knex('irrigationSetting').where({ id }).update(settingData);
        if (!setting){throw new Error('Esta configuração não existe')}

        return "Configuração atualizada com sucesso!"
    },
    async deleteIrrigationSetting(settingId, userId) {
        
        const setting = await this.getOneSetting(settingId); 
        if (!setting){
            throw new Error('Esta config não existe!')
        }
        return knex('irrigationSetting').where({ id: settingId }).del();
      
      }

};
