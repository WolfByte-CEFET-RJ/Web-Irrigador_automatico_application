const knex = require('../database'); 
const yup = require('yup'); 
const gardenService = require('./gardenService'); 

// Define o esquema de validação para criar uma configuração de irrigação
const settingSchema = yup.object().shape({
    name: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres').required(),
    userId: yup.number().integer().positive().required(),
    humidityValue: yup.string().required()
});

// Define o esquema de validação para atualizar uma configuração de irrigação
const updateSettingSchema = yup.object().shape({
    name: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    userId: yup.number().integer().positive(),
    humidityValue: yup.string()
});

function validadeHumidityValue(humidityValue){
    const regex = /^[0-9]+$/;
    return regex.test(humidityValue);
}

module.exports = {
    // Método para obter todas as configurações de irrigação
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

        // Formata as configurações finais para retorno
        const finalSetting = settings.map(setting => ({
            id: setting.id,
            name: setting.name,
            userId: setting.userId,
            humidityValue: JSON.parse(setting.sensors)[0].value
        }));

        return finalSetting;
    },

    // Método para obter uma configuração de irrigação específica por ID
    async getOneSetting(id, myId) {
        const setting = await knex('irrigationSetting')
            .select('irrigationSetting.id', 'irrigationSetting.name', 'irrigationSetting.userId', 'configSensor.value')
            .join('configSensor', 'irrigationSetting.id', '=', 'configSensor.irrigationId')
            .where({ id });

        // Verifica se o usuário é o proprietário da configuração
        if (myId != setting[0].userId) {
            throw new Error('Essa config não pertence a você!');
        }
        // Verifica se a configuração existe
        if (!setting.length) {
            throw new Error('Esta config não existe!');
        }

        // Formata a configuração final para retorno
        const finalSetting = {
            id: setting[0].id,
            name: setting[0].name,
            userId: setting[0].userId,
            humidityValue: setting[0].value
        };

        return finalSetting;
    },

    // Método para obter as configurações de irrigação de um usuário específico
    async getUserSettings(userId) {
        const settings = await knex('irrigationSetting')
            .select(
                'irrigationSetting.id as id',
                'irrigationSetting.name as name',
                'irrigationSetting.userId as userId',
                knex.raw('JSON_ARRAYAGG(JSON_OBJECT(\'sensorId\', configSensor.sensorId, \'value\', configSensor.value)) as sensors')
            )
            .where({ userId })
            .join('configSensor', 'irrigationSetting.id', '=', 'configSensor.irrigationId')
            .groupBy('irrigationSetting.id')
            .orderBy('irrigationSetting.id', 'asc');

        // Obtém a configuração padrão
        const defaultConfig = await this.getOneSetting(1);

        // Formata as configurações finais para retorno
        const finalSetting = settings.map(setting => ({
            id: setting.id,
            name: setting.name,
            userId: setting.userId,
            humidityValue: JSON.parse(setting.sensors)[0].value
        }));

        // Adiciona a configuração padrão no início do array
        finalSetting.unshift(defaultConfig);

        return finalSetting;
    },

    // Método para criar uma nova configuração de irrigação
    async createIrrigationSetting(name, userId, humidityValue) {
        await settingSchema.validate({ name, userId, humidityValue });
        
        // Verifica se já existe uma configuração com o mesmo nome para o mesmo usuário
        const settingInfo = await knex('irrigationSetting').select("id").where({ name, userId }).first();
        if (settingInfo) {
            throw new Error('Você já criou uma configuração de irrigação com este nome!');
        }

        const humidityIsValid = validadeHumidityValue(humidityValue);

        if (!humidityIsValid) throw new Error('Valor de umidade inválido!');

        // Insere a nova configuração de irrigação
        await knex('irrigationSetting').insert({
            name,
            userId
        });

        // Obtém o ID da nova configuração de irrigação
        const irrigationId = await knex('irrigationSetting').select("id").where({ name, userId }).first();

        // Insere os valores dos sensores para a nova configuração de irrigação
        await knex('configSensor').insert({ irrigationId: irrigationId.id, sensorId: 1, value: humidityValue });

        return "Configuração cadastrada!";
    },

    // Método para atualizar uma configuração de irrigação
    async updateIrrigationSetting(myId, id, settingData) {
        await updateSettingSchema.validate(settingData, { abortEarly: false });

        // Verifica se a configuração é a padrão
        if (id == 1) {
            throw new Error('Você não pode alterar uma configuração padrão.');
        }
        
        // Obtém a informação da configuração
        const settingInfo = await this.getOneSetting(id, myId);

        // Verifica se o usuário é o proprietário da configuração
        if (myId != settingInfo.userId) {
            throw new Error("Você só pode atualizar sua própria config.");
        }

        if (Object.keys(settingData).length === 0){
            throw new Error('Nenhum valor foi passado!');
        }

        // Verifica se o usuário está tentando alterar o userId (não permitido)
        if (settingData.userId) {
            throw new Error('Você não pode alterar o userId.');
        }

        // Verifica e atualiza o nome da configuração, se fornecido
        if (settingData.name) {
            const settingInfo = await knex('irrigationSetting').select("id").where({ name: settingData.name, userId: myId }).first();
            if (settingInfo) {
                throw new Error('Já existe uma configuração com esse nome!');
            }

            const settingForChange = await knex('irrigationSetting').where({ id }).update({ name: settingData.name });
            if (!settingForChange) {
                throw new Error('Esta configuração não existe!');
            }
        }

        // Verifica e atualiza o valor da umidade, se fornecido
        if (settingData.humidityValue) {
            const humidityIsValid = validadeHumidityValue(settingData.humidityValue);
            if (!humidityIsValid) throw new Error('Valor de umidade inválido!');

            const humidityValue = await knex('configSensor').where({ irrigationId: settingInfo.id, sensorId: 1 }).update({ value: settingData.humidityValue });
            if (!humidityValue) {
                throw new Error('Erro ao alterar o valor da umidade!');
            }
        }

        return "Configuração atualizada com sucesso!";
    },

    // Método para deletar uma configuração de irrigação
    async deleteIrrigationSetting(settingId, userId) {

        // Verifica se a configuração é a padrão (não pode ser apagada)
        if (settingId == 1) {
            throw new Error('Você não pode apagar uma configuração padrão!');
        }

        // Obtém a configuração
        const setting = await this.getOneSetting(settingId, userId);
    
        // Verifica se a configuração pertence ao usuário
        if (setting.userId != userId) {
            throw new Error('Esta config não pertence a você!');
        }

        // Verifica se a configuração está sendo usada em algum jardim e, se sim, remove a associação
        const inUseSettings = await knex('garden').select('id').where({ irrigationId: settingId });
        if (inUseSettings.length > 0) {
            inUseSettings.forEach(async item => {
                gardenId = item.id;
                gardenData = { irrigationId: 1 }; // Define a configuração padrão

                await knex('garden').where({ id: gardenId }).update(gardenData);
            });
        }

        // Deleta os valores dos sensores da configuração
        const deleteValues = await knex('configSensor').where({ irrigationId: settingId }).del();
        if (!deleteValues) {
            throw new Error('Erro ao apagar valores da configuração!');
        }

        // Deleta o nome da configuração
        const deleteName = await knex('irrigationSetting').where({ id: settingId }).del();
        if (!deleteName) {
            throw new Error('Erro ao apagar nome da configuração!');
        }

        return 'Configuração apagada com sucesso!';
    }
};
