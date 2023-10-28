exports.up = function(knex) {
    return knex.schema.createTable("identifier", (table) => {
        table.increments("id").primary();
        table.string("value").notNullable();
        table.integer("gardenId").unsigned().references("id").inTable("garden");
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable("identifier");
};
