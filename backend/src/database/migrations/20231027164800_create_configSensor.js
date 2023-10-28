
exports.up = function(knex) {
  return knex.schema.createTable('configSensor', (table) => {
      table.integer("sensorId").references("id").inTable("sensor");
      table.integer("irrigationId").references("id").inTable("irrigationSetting");
      table.string("value").notNullable();
      table.primary(["sensorId", "irrigationId"]);
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('configSensor');
};
