const knex = require('../database');
const yup = require('yup');
const { IdentifierNotFound, IdentifierAlreadyAssociated, UnauthorizedGardenUpdate, UnauthorizedUserIdUpdate, GardenNotFound, UnauthorizedGardenDelete, UnauthorizedGardenReturn, NoGardenRegistered } = require('../errors/gardenError');
const { IrrigationSettingNotFound, UnauthorizedIrrigationSettingOperation } = require('../errors/irrigationSettingError');

// Função para verificar se o identificador já existe em alguma horta
async function verifyIdentifer(identifier){
    const identifierExists = await knex('identifier').select("id", "gardenId").where({ value: identifier }).first();

    if (!identifierExists){ // Se o identificador não existe, lança um erro
        throw new IdentifierNotFound()}

    if (identifierExists.gardenId != null){ // Se o identificador já pertence a uma horta, lança um erro
        throw new IdentifierAlreadyAssociated()}

    return identifierExists; // Retorna as informações do identificador
}

module.exports = {
    async getAllGardens() {
        return await knex('garden').select('*');
    },
    
    async getOneGarden(id, userId) {
        const garden = await knex('garden').where({ id }).first();
        
        if (!garden){throw new GardenNotFound()};
        if (garden.userId !== userId){throw new UnauthorizedGardenReturn()}
        
        return garden;
    },
    async getUserGardens (userId) {
        const garden = await knex('garden').where({ userId });

        if (!garden.length){throw new NoGardenRegistered()}
        
        return garden;
    },
    async createGarden(name, description, identifier, userId) {
        const irrigationId = 1; // Define o ID de configuração de irrigação padrão
        
        const gardenCreateSchema = yup.object().shape({ // Define o esquema de validação
            name: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
            description: yup.string(),
            identifier: yup.string().required().min(10, 'O identificar deve ter 10 caracteres.').matches(/^[0-9]+$/, 'O identificador deve conter apenas números.'), 
            userId: yup.number().integer().positive(),
            irrigationId: yup.number().integer().positive(),
        });
        
        await gardenCreateSchema.validate({name, description, identifier, userId, irrigationId}) // Valida os dados da nova horta
        
        const identifierInformation = await verifyIdentifer(identifier); // Verifica se o identificador já existe
        
        await knex('garden').insert({ 
            name,
            description,
            identifier,
            userId,
            irrigationId
        });
        
        const garden = await knex('garden').select("id").where({ identifier: identifier }).first(); // Obtém o ID da nova horta
        
        await knex('identifier').where({id: identifierInformation.id}).update({gardenId: garden.id}); // Atualiza o ID da horta no identificador
        
        return "Horta cadastrada!"
    },

    async updateGarden(myId, gardenId, gardenData) {

        const gardenUpdateSchema = yup.object().shape({ // Define o esquema de validação
            name: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
            description: yup.string(),
            identifier: yup.string().min(10, 'O identificar deve ter 10 caracteres.').matches(/^[0-9]+$/, 'O identificador deve conter apenas números.'), 
            userId: yup.number().integer().positive(),
            irrigationId: yup.number().integer().positive(),
        });
        
        await gardenUpdateSchema.validate(gardenData); // Valida os dados atualizados da horta
        
        const {userId} = await this.getOneGarden(gardenId, myId); // Obtém o ID do usuário dono da horta
        
        
        if (myId != userId){throw new UnauthorizedGardenUpdate()} // Se o usuário não é o dono da horta, lança um erro
        if(gardenData.userId){throw new UnauthorizedUserIdUpdate()} // Se tentar alterar o ID do usuário, lança um erro
        
        if(gardenData.irrigationId){ // Se estiver atualizando a configuração de irrigação
            const userSetting = await knex('irrigationSetting').select("*").where({ id: gardenData.irrigationId }).first();
            if (!userSetting) {throw new IrrigationSettingNotFound('ERR_SERVICE_GARDEN-IRRIGATION_SETTING_NOT_FOUND')} // Se a configuração de irrigação não existe, lança um erro
            if (userSetting.userId != myId){throw new UnauthorizedIrrigationSettingOperation('ERR_SERVICE_GARDEN-UNAUTHORIZED_IRRIGATION_SETTING_OPERATION')} // Se a configuração não pertence ao usuário, lança um erro
        }
        
        if (gardenData.identifier) { // Se estiver atualizando o identificador
            const identifierInformation = await this.verifyIdentifer(gardenData.identifier); // Verifica se o novo identificador já existe

            await knex('identifier').where({ gardenId }).update({ gardenId: null }); // Remove o ID da horta do identificador antigo
            await knex('identifier').where({ id: identifierInformation.id }).update({ gardenId }); // Atualiza o ID da nova horta no identificador
        }

        const garden = await knex('garden').where({ id: gardenId }).update(gardenData); // Atualiza os dados da horta

        if (!garden) { 
            throw new GardenNotFound();
        }

        
        return "Horta atualizada com sucesso!"
    },

    async deleteGarden(myId, id) {
        const {userId} = await this.getOneGarden(id, myId);
        
        if (myId != userId){throw new UnauthorizedGardenDelete()}
        await knex('identifier').where({ gardenId: id }).update({gardenId: null});
        const garden = await knex('garden').where({ id }).del();
        if (!garden){throw new GardenNotFound()}

        return "Horta deletada com sucesso"
    }
    
    ,verifyIdentifer
};
