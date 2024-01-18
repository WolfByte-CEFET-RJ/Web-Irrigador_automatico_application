
exports.up = function(knex) {
    return knex.schema.alterTable("garden", async (table) => {
        table.dropForeign("configId");
        await table.dropColumn("configId");
        table.integer("irrigationId").unsigned().references("id").inTable("irrigationSetting").onDelete("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable("garden", async (table) => {
        table.dropForeign("irrigationId");
        await table.dropColumn("irrigationId");
        table.integer("configId").unsigned().references("id").inTable("irrigationSetting").onDelete("CASCADE");
    })
};
