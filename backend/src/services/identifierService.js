const knex = require('../database');

module.exports = {
    async getIdentifiers() {
        return await knex('identifier').select('*');
    },
    async getOneIdentifier(id) {
        const setting = await knex('identifier').where({ id }).first();
        if (!setting){throw new Error('Este identificador não existe')};

        return setting;
    }

};
