const knex = require("../database");
const convertDate = require("../utils/convertDate")

module.exports = {
    async getAllUserGardensHistory(userId){
        const userGardensHistory = await knex('user as u').select('g.name as gardenName', 'ih.date as date')
        .join('garden as g', 'g.userId', '=', 'u.id')
        .join('irrigationHistory as ih', 'ih.gardenId', '=', 'g.id')
        .where({'u.id': userId}).orderBy('date', 'asc')

        if (!userGardensHistory.length){throw new Error("Nenhum histórico de irrigação foi encontrado!")}

        const finalUserGardensHistory = userGardensHistory.map(object => ({gardenName: object.gardenName, date: convertDate(object.date)}));

        return finalUserGardensHistory;
    },

    async getOneGardenHistory(userId, gardenName){
        const userGardenHistory = await knex('user as u').select('g.name as gardenName', 'ih.date as date')
        .join('garden as g', 'g.userId', '=', 'u.id')
        .join('irrigationHistory as ih', 'ih.gardenId', '=', 'g.id')
        .where({'u.id': userId, 'g.name': gardenName}).orderBy('date', 'asc')

        if(!userGardenHistory.length){throw new Error("Nenhum histórico de irrigação para essa horta foi encontrado ou essa não é sua horta!")}

        const finalUserGardenHistory = userGardenHistory.map(object => ({gardenName: object.gardenName, date: convertDate(object.date)}));

        return finalUserGardenHistory;
    }
}