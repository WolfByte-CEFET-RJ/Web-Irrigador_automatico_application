
exports.up = function(knex) {   
    return knex.schema.createTable("irrigationSetting", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.integer("userId").unsigned().references("id").inTable("user").onDelete("CASCADE").nullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("irrigationSetting");
};
