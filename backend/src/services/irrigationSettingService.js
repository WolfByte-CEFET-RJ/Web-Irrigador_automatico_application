const knex = require('../database'); 
const yup = require('yup'); 
const { DuplicatedIrrigatonSettingName, InvalidHumidity, DefaultSettingNotDeleteable, UpdateUmidityValueError, IrrigationSettingAlreadyExists, NoValuePassed, UserIdNotEditable, InvalidUpdateFields, 
    UnauthorizedIrrigationSettingOperation, NothingToDeleteError, IrrigationSettingNotFound, DefaultSettingNotEditable} = require('../errors/irrigationSettingError');

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

function verifyUpdateData(data){
    const irrigationSettingModel = [
        'name', 'humidityValue'
    ]

    for (const key in data){
        if (irrigationSettingModel.indexOf(key) === -1){
            return false;
        }
    }

    return true;
}

function validadeHumidityValue(humidityValue){
    const regex = /^[0-9]+$/;
    return regex.test(humidityValue);
}

// Cria um objeto com o nome dos sensores, junto com seu valor, de cada configuração passada no array 
async function returnConfigSensors(settingsArray){
    const allSensors = [];

    for (const setting of settingsArray) {
        const sensors = {};
        for (const sensor of JSON.parse(setting.sensors)) {
            const sensorName = await knex('sensor').select('name').where({ id: sensor.sensorId }).first();

            sensors[sensorName.name] = sensor.value;
        }
        allSensors.push(sensors);
    }

    return allSensors;
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

        const allSensors = await this.returnConfigSensors(settings);

        // Formata as configurações finais para retorno
        const finalSetting = settings.map((setting, index) => ({
            id: setting.id,
            name: setting.name,
            userId: setting.userId,
            ...allSensors[index]
        }));

        return finalSetting;
    },

    // Método para obter uma configuração de irrigação específica por ID
    async getOneSetting(id, myId) {
        const setting = await knex('irrigationSetting')
            .select('irrigationSetting.id', 'irrigationSetting.name', 'irrigationSetting.userId', 'configSensor.value', 'configSensor.sensorId')
            .join('configSensor', 'irrigationSetting.id', '=', 'configSensor.irrigationId')
            .where({ id });

        // Verifica se a configuração existe
        if (!setting.length) {
            throw new IrrigationSettingNotFound();
        }
                
        // Verifica se o usuário é o proprietário da configuração
        if (myId != setting[0].userId && setting[0].id != 1) {
            throw new UnauthorizedIrrigationSettingOperation();
        }
        const sensors = {};

        // Pega o nome e o valor dos sensores da config
        for (const config of setting) {
            const sensorName = await knex('sensor').select('name').where({ id: config.sensorId }).first();

            sensors[sensorName.name] = config.value;
        }

        // Formata a configuração final para retorno
        const finalSetting = {
            id: setting[0].id,
            name: setting[0].name,
            userId: setting[0].userId,
            ...sensors
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

        const allSensors = await returnConfigSensors(settings);

        // Obtém a configuração padrão
        const defaultConfig = await this.getOneSetting(1);

        // Formata as configurações finais para retorno
        const finalSetting = settings.map((setting, index) => {
            return {
                id: setting.id,
                name: setting.name,
                userId: setting.userId,
                ...allSensors[index]
            };
        });

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
            throw new DuplicatedIrrigatonSettingName();
        }

        const humidityIsValid = validadeHumidityValue(humidityValue);

        if (!humidityIsValid) throw new InvalidHumidity();

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
            throw new DefaultSettingNotEditable();
        }
        
        // Obtém a informação da configuração
        const settingInfo = await this.getOneSetting(id, myId);

        // Verifica se o usuário é o proprietário da configuração
        if (myId != settingInfo.userId) {
            throw new UnauthorizedIrrigationSettingOperation();
        }

        if (Object.keys(settingData).length === 0){
            throw new NoValuePassed();
        }

        // Verifica se o usuário está tentando alterar o userId (não permitido)
        if (settingData.userId) {
            throw new UserIdNotEditable();
        }

        if (!this.verifyUpdateData(settingData)) {throw new InvalidUpdateFields();}

        // Verifica e atualiza o nome da configuração, se fornecido
        if (settingData.name) {
            const settingInfo = await knex('irrigationSetting').select("id").where({ name: settingData.name, userId: myId }).first();
            if (settingInfo) {
                throw new IrrigationSettingAlreadyExists();
            }

            const settingForChange = await knex('irrigationSetting').where({ id }).update({ name: settingData.name });
            if (!settingForChange) {
                throw new IrrigationSettingNotFound();
            }
        }

        // Verifica e atualiza o valor da umidade, se fornecido
        if (settingData.humidityValue) {
            const humidityIsValid = this.validadeHumidityValue(settingData.humidityValue);
            if (!humidityIsValid) throw new InvalidHumidity();

            const humidityValue = await knex('configSensor').where({ irrigationId: settingInfo.id, sensorId: 1 }).update({ value: settingData.humidityValue });
            if (!humidityValue) {
                throw new UpdateUmidityValueError();
            }
        }

        return "Configuração atualizada com sucesso!";
    },

    // Método para deletar uma configuração de irrigação
    async deleteIrrigationSetting(settingId, userId) {

        // Verifica se a configuração é a padrão (não pode ser apagada)
        if (settingId == 1) {
            throw new DefaultSettingNotDeleteable()
        }

        // Obtém a configuração
        const setting = await this.getOneSetting(settingId, userId);

        // Verifica se a configuração pertence ao usuário
        if (setting.userId != userId) {
            throw new UnauthorizedIrrigationSettingOperation();
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
            throw new NothingToDeleteError('Erro ao apagar valores da configuração!');
        }

        // Deleta o nome da configuração
        const deleteName = await knex('irrigationSetting').where({ id: settingId }).del();
        if (!deleteName) {
            throw new NothingToDeleteError('Erro ao apagar nome da configuração!');
        }

        return 'Configuração apagada com sucesso!';
    }, 
    returnConfigSensors,
    verifyUpdateData,
    validadeHumidityValue
};
