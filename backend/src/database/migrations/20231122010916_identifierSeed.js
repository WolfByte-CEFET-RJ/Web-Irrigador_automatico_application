const GenSeed = require("../../utils/identifierSeed");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return Promise.all([
    knex('identifier').insert({value:GenSeed(1)}),
    knex('identifier').insert({value:GenSeed(2)}),
  ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex('identifier').truncate()
};
