exports.up = async function(knex) {
    // Remover as colunas existentes
    await knex.schema.alterTable("garden", async (table) => {
        table.dropForeign("userId")
        table.dropForeign("irrigationId")
        table.dropColumn("userId");
        table.dropColumn("irrigationId");
    });

    // Adicionar as colunas com as propriedades desejadas
    await knex.schema.alterTable("garden", async (table) => {
        table.integer("userId").unsigned().references("id").inTable("user").onDelete("CASCADE");
        table.integer("irrigationId").unsigned().references("id").inTable("irrigationSetting").onDelete("SET NULL");
    });
};

exports.down = async function(knex) {
    // Desfazer as alterações feitas no método up
    await knex.schema.alterTable("garden", async (table) => {
        table.dropColumn("userId");
        table.dropColumn("irrigationId");
    });

    // Adicionar novamente as colunas removidas
    await knex.schema.alterTable("garden", async (table) => {
        table.integer("userId");
        table.integer("irrigationId");
    });
};
