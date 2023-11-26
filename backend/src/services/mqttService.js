const knex = require('../database');

module.exports = {
    async insertData(data){
        const garden = await knex('garden').select("id").where({identifier: data.identificador});

        if (!garden){throw new Error('O identificador informado não pertence a uma horta!');}

        let sensorId = data.sensor === "Umidade" ? 1 : 2;

        await knex('measurement').insert({
            measurement: data.medida,
            date: knex.fn.now(),
            sensorId: sensorId,
            gardenId: garden.id
        });
    }
}