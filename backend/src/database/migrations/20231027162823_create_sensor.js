
exports.up = function(knex) {
    return knex.schema.createTable('sensor', (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("unitOfMeasurement").notNullable();
    })
};


exports.down = function(knex) {
  return knex.schema.dropTable('sensor');
};
