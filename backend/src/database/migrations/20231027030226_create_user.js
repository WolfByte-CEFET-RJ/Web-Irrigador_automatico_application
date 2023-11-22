
exports.up = function(knex) {
    return knex.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.tinyint("humidityNotification").notNullable().defaultTo(1);
        table.tinyint("waterNotification").notNullable().defaultTo(1);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("user");
};
