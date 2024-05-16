
exports.up = function(knex) {
  return knex.schema.alterTable("user", async (table) => {
      table.dropColumn("waterNotification");
  })
};

exports.down = function(knex) {
  return knex.schema.table("user", async (table) => {
      table.tinyint("waterNotification").notNullable().defaultTo(1);
  })
};
