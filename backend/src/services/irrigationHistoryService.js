const knex = require("../database");

module.exports = {
    async getAllUserGardensHistory(userId){
        const userGardensHistory = await knex('user as u').select('g.name as gardenName', 'ih.date as date')
        .join('garden as g', 'g.userId', '=', 'u.id')
        .join('irrigationHistory as ih', 'ih.gardenId', '=', 'g.id')
        .where('u.id', userId).orderBy('date', 'asc')

        return userGardensHistory;
    },

    async getOneGardenHistory(userId, gardenName){
        /*const userGardenHistory = await knex('user as u').select('g.name as gardenName', 'ih.date as date')
        .join('garden as g', 'g.userId', '=', 'u.id')
        .join('irrigationHistory as ih', 'ih.gardenId', '=', 'g.id')
        .where('u.id', userId).orderBy('date', 'asc')

        return userGardenHistory;*/
    }
}