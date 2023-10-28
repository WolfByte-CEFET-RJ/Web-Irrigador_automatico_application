exports.up = function(knex) {
    return knex.schema.createTable("identifier", (table) => {
        table.increments("id").primary();
        table.string("value").notNullable();
        table.integer("gardenId").references("id").inTable("garden").defaultTo(null);
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable("identifier");
};
