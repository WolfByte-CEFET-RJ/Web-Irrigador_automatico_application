const knex = require('../database');

module.exports = {
    async getSettings() {
        return await knex('irrigationSetting').select('*');
    },
    async getOneSetting(id) {
        const setting = await knex('irrigationSetting').where({ id }).first();
        if (!setting){throw new Error('Esta config não existe')};

        return setting;
    }

};
