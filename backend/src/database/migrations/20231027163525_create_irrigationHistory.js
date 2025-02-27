
exports.up = function(knex) {
    return knex.schema.createTable("irrigationHistory", (table) => {
        table.increments("id").primary();
        table.timestamp("date").notNullable();
        table.integer("gardenId").unsigned().references("id").inTable("garden").onDelete("CASCADE");
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable("irrigationHistory");
};
