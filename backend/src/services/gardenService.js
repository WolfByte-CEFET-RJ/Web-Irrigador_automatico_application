const knex = require('../database');
const yup = require('yup');

const gardenSchema = yup.object().shape({
    name: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres').required(),
    description: yup.string(),
    identifier: yup.string().required(), 
    userId: yup.number().integer().positive().required(),
    configId: yup.number().integer().positive().required(),
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

    async createGarden(name, description, identifier, userId, configId) {
        await gardenSchema.validate({name, description, identifier, userId, configId})
        const userSetting = await knex('irrigationSetting').select("userId").where({ id: configId }).first();
       
        if (userSetting.userId != userId){throw new Error('Essa configuração não pertence à você!')}

        await knex('garden').insert({
            name,
            description,
            identifier,
            userId,
            configId
        });
        return "Horta cadastrada!"
    },

    async updateGarden(myId, id, gardenData) {
        
        const {userId} = await this.getOneGarden(id);
        console.log(userId);

        if (myId != userId){throw new Error("Você só pode atualizar sua própria horta")}
        if(gardenData.userId){throw new Error('Você não pode alterar o userId')}

        const garden = await knex('garden').where({ id }).update(gardenData);
        if (!garden){throw new Error('Esta horta não existe')}

        return "Horta atualizada com sucesso!"
    },

    async deleteGarden(myId, id) {
        const {userId} = await this.getOneGarden(id);
        
        if (myId != userId){throw new Error("Você só pode deletar sua própria horta")}
        const garden = await knex('garden').where({ id }).del();
        if (!garden){throw new Error('Esta horta não existe')}

        return "Horta deletada com sucesso"
    }
};
