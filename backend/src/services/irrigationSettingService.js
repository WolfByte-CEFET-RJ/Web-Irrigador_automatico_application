const knex = require('../database');

module.exports = {
    async getSettings() {
        return await knex('irrigationSetting').select('*');
    },

};
