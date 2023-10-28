
exports.up = function(knex) {
    return knex.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.boolean("humidityNotification").notNullable();
        table.boolean("waterNotification").notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("user");
};
