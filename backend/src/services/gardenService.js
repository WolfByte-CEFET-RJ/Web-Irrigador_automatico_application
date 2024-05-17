const knex = require('../database');
const yup = require('yup');

// Função para verificar se o identificador já existe em alguma horta
async function verifyIdentifer(identifier){
    const identifierExists = await knex('identifier').select("id", "gardenId").where({ value: identifier }).first();

    if (!identifierExists){ // Se o identificador não existe, lança um erro
        throw new Error('O identificador inserido não pertence a uma horta existente!')}

    if (identifierExists.gardenId != null){ // Se o identificador já pertence a uma horta, lança um erro
        console.log("entri"); throw new Error('O identificador inserido já pertence a uma horta!')}

    return identifierExists; // Retorna as informações do identificador
}

module.exports = {
    async getAllGardens() {
        return await knex('garden').select('*');
    },

    async getOneGarden(id, userId) {
        const garden = await knex('garden').where({ id }).first();
        
        if (!garden){throw new Error('Esta horta não existe')};
        if (garden.userId !== userId){throw new Error('Esta horta não pertence a você!')}

        return garden;
    },
    async getUserGardens (userId) {
        const garden = await knex('garden').where({ userId });

        if (!garden.length){return 'O usuário ainda não possui hortas criadas.'}

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
        

        if (myId != userId){throw new Error("Você só pode atualizar sua própria horta")} // Se o usuário não é o dono da horta, lança um erro
        if(gardenData.userId){throw new Error('Você não pode alterar o userId')} // Se tentar alterar o ID do usuário, lança um erro

        if(gardenData.irrigationId){ // Se estiver atualizando a configuração de irrigação
                const userSetting = await knex('irrigationSetting').select("*") .where({ id: gardenData.irrigationId }).first();
                if (!userSetting) {throw new Error('Essa configuração não existe!')} // Se a configuração de irrigação não existe, lança um erro
                if (userSetting.userId != myId){throw new Error('Essa configuração não pertence à você!')} // Se a configuração não pertence ao usuário, lança um erro
        }

        if (gardenData.identifier) { // Se estiver atualizando o identificador
            const identifierInformation = await verifyIdentifer(gardenData.identifier); // Verifica se o novo identificador já existe

            await knex('identifier').where({ gardenId }).update({ gardenId: null }); // Remove o ID da horta do identificador antigo
            await knex('identifier').where({ id: identifierInformation.id }).update({ gardenId }); // Atualiza o ID da nova horta no identificador
        }

        const garden = await knex('garden').where({ id: gardenId }).update(gardenData); // Atualiza os dados da horta

        if (!garden) { // Se a horta não existe, lança um erro
            throw new Error('Esta horta não existe');
        }


        return "Horta atualizada com sucesso!"
    },

    async deleteGarden(myId, id) {
        const {userId} = await this.getOneGarden(id, myId);
        
        if (myId != userId){throw new Error("Você só pode deletar sua própria horta")}
        await knex('identifier').where({ gardenId: id }).update({gardenId: null});
        const garden = await knex('garden').where({ id }).del();
        if (!garden){throw new Error('Esta horta não existe')}

        return "Horta deletada com sucesso"
    }
};
