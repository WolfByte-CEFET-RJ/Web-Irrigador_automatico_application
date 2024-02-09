const knex = require('../database');
const yup = require('yup');

const gardenSchema = yup.object().shape({
    name: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres').required(),
    description: yup.string(),
    identifier: yup.string().required().min(10, 'O identificar deve ter 10 caracteres.').matches(/^[0-9]+$/, 'O identificador deve conter apenas números.'), 
    userId: yup.number().integer().positive().required(),
    irrigationId: yup.number().integer().positive().required(),
  });


module.exports = {
    async getAllGardens() {
        return await knex('garden').select('*');
    },

    async getOneGarden(id) {
        const garden = await knex('garden').where({ id }).first();
        if (!garden){throw new Error('Esta horta não existe')};

        return garden;
    },
    async getUserGardens (userId) {
        const garden = await knex('garden').where({ userId });

        return garden;
    },
    async createGarden(name, description, identifier, userId) {
        const irrigationId = 1;
        await gardenSchema.validate({name, description, identifier, userId, irrigationId})

        const identifierExists = await knex('identifier').select("id", "gardenId").where({ value: identifier }).first();

        if (!identifierExists){throw new Error('O identificador inserido não pertence a uma horta existente!')}

        if (identifierExists.gardenId != null){throw new Error('O identificador inserido já pertence a uma horta!')}

        await knex('garden').insert({
            name,
            description,
            identifier,
            userId,
            irrigationId
        });

        const garden = await knex('garden').select("id").where({ identifier: identifier }).first();

        await knex('identifier').where({id: identifierExists.id}).update({gardenId: garden.id});

        return "Horta cadastrada!"
    },

    async updateGarden(myId, id, gardenData) {
        
        const {userId} = await this.getOneGarden(id);


        if (myId != userId){throw new Error("Você só pode atualizar sua própria horta")}
        if(gardenData.userId){throw new Error('Você não pode alterar o userId')}

        if(gardenData.irrigationId){
                const userSetting = await knex('irrigationSetting').select("*") .where({ id: gardenData.irrigationId }).first();
                if (!userSetting) {throw new Error('Essa configuração não existe!')}
                if (userSetting.userId != myId){throw new Error('Essa configuração não pertence à você!')}
        }


        const garden = await knex('garden').where({ id }).update(gardenData);
        if (!garden){throw new Error('Esta horta não existe')}

        return "Horta atualizada com sucesso!"
    },

    async deleteGarden(myId, id) {
        const {userId} = await this.getOneGarden(id);
        
        if (myId != userId){throw new Error("Você só pode deletar sua própria horta")}
        const identifier = await knex('identifier').where({ gardenId: id }).update({gardenId: null});
        const garden = await knex('garden').where({ id }).del();
        if (!garden){throw new Error('Esta horta não existe')}

        return "Horta deletada com sucesso"
    }
};
