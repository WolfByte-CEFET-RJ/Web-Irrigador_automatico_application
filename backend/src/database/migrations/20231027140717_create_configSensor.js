
exports.up = function(knex) {
  return knex.schema.createTable('configSensor', (table) => {
      table.integer("sensorId").unsigned();
      table.integer("irrigationId").unsigned();
      table.foreign("sensorId").references("id").inTable("sensor").onDelete("CASCADE");
      table.foreign("irrigationId").references("id").inTable("irrigationSetting").onDelete("CASCADE");
      table.string("value").notNullable();
      table.primary(["sensorId", "irrigationId"]);

  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('configSensor');
};
