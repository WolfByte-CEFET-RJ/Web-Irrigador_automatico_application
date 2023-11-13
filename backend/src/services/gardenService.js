const knex = require('../database');

module.exports = {
    async getAllGardens() {
        return await knex('garden').select('*');
    },

    async getOneGarden(id) {
        return await knex('garden').where({ id }).first();
    },

    async createGarden(name, description, identifier, userId, configId) {
        return await knex('garden').insert({
            name,
            description,
            identifier,
            userId,
            configId
        });
    },

    async updateGarden(id, gardenData) {
        return await knex('garden').where({ id }).update(gardenData);
    },

    async deleteGarden(id) {
        return await knex('garden').where({ id }).del();
    }
};
