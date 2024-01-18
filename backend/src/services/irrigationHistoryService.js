const knex = require("../database");

module.exports = {
    async getAllUserGardensHistory(userId){
        // Primeira opção

        /*
        select ih.date from user u
        join garden g on (g.userId = u.id)
        join irrigationHistory ih on (ih.gardenId = g.id)
        where user = userId
        */

        // Segunda opção:pPegar todas as hortas de um usuário e retornar os históricos comparando esses ids na consulta
    },

    async getOneGardenHistory(gardenId){

    }
}