exports.up = async function(knex) {
    // Remover as colunas existentes
    await knex.schema.alterTable("configSensor", async (table) => {
        table.dropForeign("sensorId")
        table.dropForeign("irrigationId")
        //table.dropColumn("sensorId");
        //table.dropColumn("irrigationId");
    });

    // Adicionar as colunas com as propriedades desejadas
    await knex.schema.alterTable("configSensor", async (table) => {
        table.foreign("sensorId").references("id").inTable("sensor").onDelete("CASCADE");
        table.foreign("irrigationId").references("id").inTable("irrigationSetting").onDelete("CASCADE");
    });
};

exports.down = async function(knex) {
    // Desfazer as alterações feitas no método up
    await knex.schema.alterTable("configSensor", async (table) => {
        table.dropForeign("sensorId")
        table.dropForeign("irrigationId")
        //table.dropColumn("sensorId");
        //table.dropColumn("irrigationId");
    });

    // Adicionar novamente as colunas removidas
    await knex.schema.alterTable("configSensor", async (table) => {
        table.foreign("sensorId").references("id").inTable("sensor").onDelete("CASCADE");
        table.foreign("irrigationId").references("id").inTable("irrigationSetting").onDelete("CASCADE");
    });
};
