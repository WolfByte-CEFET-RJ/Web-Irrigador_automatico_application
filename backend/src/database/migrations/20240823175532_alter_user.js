
exports.up = function(knex) {
    return knex.schema.alterTable("user", async (table) => {
        table.string("code").alter();
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable("user", async (table) => {
        table.integer("code").alter();
    })
};
