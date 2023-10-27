
exports.up = function(knex) {
  return knex.schema.createTable('configSensor', (table) => {
    
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('configSensor');
};
