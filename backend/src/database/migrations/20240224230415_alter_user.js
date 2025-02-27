
exports.up = function (knex) {
    return knex.schema.alterTable("user", async (table) => {
        table.integer("code").defaultTo(null).alter();
    })
};

exports.down = function (knex) {
    return;
};
