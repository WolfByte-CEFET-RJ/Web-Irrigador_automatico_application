
exports.up = function(knex) {
  return knex.schema.createTable('measurement', (table) => {
    table.increments("id").primary();
    table.string("measurement").notNullable();
    table.timestamp("date").notNullable();
    table.integer("sensorId").unsigned().references("id").inTable("sensor").onDelete("CASCADE");
    table.integer("userId").unsigned().notNullable().references("id").inTable("garden").onDelete("CASCADE");
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('measurement');
};
