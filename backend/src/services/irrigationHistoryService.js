const knex = require("../database");
const { IrrigationHistoryNotFound } = require("../errors/irrigationHistoryError");
const convertDate = require("../utils/convertDate")

module.exports = {
    // Retorna o histórico de irrigação de todas as hortas do usuário autenticado
    async getAllUserGardensHistory(userId){
        const userGardensHistory = await knex('user as u').select('g.name as gardenName', 'ih.date as date')
        .join('garden as g', 'g.userId', '=', 'u.id')
        .join('irrigationHistory as ih', 'ih.gardenId', '=', 'g.id')
        .where({'u.id': userId}).orderBy('date', 'asc')

        if (!userGardensHistory.length){
            throw new IrrigationHistoryNotFound()
        }

        const finalUserGardensHistory = userGardensHistory.map(object => ({gardenName: object.gardenName, date: convertDate(object.date)}));

        return finalUserGardensHistory;
    },

    // Retorna o histórico de irrigação de uma horta do usuário autenticado
    async getOneGardenHistory(userId, gardenName){
        const userGardenHistory = await knex('user as u')
        .select('g.name as gardenName', 'ih.date as date')
        .join('garden as g', 'g.userId', '=', 'u.id')
        .join('irrigationHistory as ih', 'ih.gardenId', '=', 'g.id')
        .where('u.id', userId)
        .andWhere('g.name', gardenName)
        .orderBy('date', 'asc');

        if(!userGardenHistory.length){
            throw new IrrigationHistoryNotFound()
        }

        const finalUserGardenHistory = userGardenHistory.map(object => ({
            gardenName: object.gardenName, 
            date: convertDate(object.date)
        }));

        return finalUserGardenHistory;
    }
}