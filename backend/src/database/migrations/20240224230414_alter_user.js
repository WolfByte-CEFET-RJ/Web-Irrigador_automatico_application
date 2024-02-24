
exports.up = function(knex) {
    return knex.schema.alterTable("user", async (table) => {
        table.integer("code");
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable("user", async (table) => {
        table.dropColumn("code");
    })
};
