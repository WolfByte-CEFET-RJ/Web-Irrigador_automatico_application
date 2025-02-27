
exports.up = function(knex) {
    return knex.schema.alterTable("garden", async (table) => {
        table.integer("irrigationId").unsigned().references("id").inTable("irrigationSetting").onDelete("CASCADE");
        table.dropForeign("configId");
        table.dropColumn("configId");
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable("garden", async (table) => {
        table.integer("configId").unsigned().references("id").inTable("irrigationSetting").onDelete("CASCADE");
        table.dropForeign("irrigationId");
        table.dropColumn("irrigationId");
    })
};
