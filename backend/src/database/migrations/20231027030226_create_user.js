
exports.up = function(knex) {
    return knex.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table.string("name").notNull();
        table.string("email").notNull().unique();
        table.string("passsword").notNull();
        table.boolean("humidityNotification").notNull();
        table.boolean("waterNotification").notNull();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("user");
};
