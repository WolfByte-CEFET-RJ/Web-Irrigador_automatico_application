const GenSeed = require("../../utils/identifierSeed");

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('identifier').del()
  await knex('identifier').insert([
    {value: GenSeed(1)},
    {value: GenSeed(2)}
  ]);
};
