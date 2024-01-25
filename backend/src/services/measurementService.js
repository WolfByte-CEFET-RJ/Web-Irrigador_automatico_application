const knex = require('../database');

module.exports = {
    async lastMeasures (gardenId) {
        let lastMeasures = [];
        const sensors = await knex('sensor').select('id');
        
        for(i=0; i<sensors.length; i++) {
            const lastMeasure = await knex('measurement').select('*').where({gardenId, sensorId: sensors[i].id}).orderBy('date','desc').first();
            lastMeasures.push(lastMeasure);
        }


        return lastMeasures;
    },

    async lastMeasuresAllGardens(gardens) {
        let lastMeasures = [];
        let lastMeasuresGardens = gardens;
        const sensors = await knex('sensor').select('id');

        for(i=0; i<gardens.length; i++) {
            for(j=0; j<sensors.length; j++) {
                const meausures = await knex('measurement').select('*').where({gardenId: gardens[i].id, sensorId: sensors[j].id}).orderBy('date','desc').first();
                if (meausures){lastMeasures.push(meausures)}
            }
            lastMeasuresGardens[i].lastMeasures = []
        }
        
        for(i=0; i<lastMeasuresGardens.length; i++){
            for(j=0; j<lastMeasures.length; j++){
                if (lastMeasuresGardens[i].id == lastMeasures[j].gardenId){
                    lastMeasuresGardens[i].lastMeasures.push(lastMeasures[j]);
                }
            }
        }

        return lastMeasuresGardens;
        
    }
}
