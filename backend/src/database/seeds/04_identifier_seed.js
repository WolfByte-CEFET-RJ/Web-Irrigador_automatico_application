exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('identifier').del()
  await knex('identifier').insert([
    {value: "2024201112"},
    {value: "2024201668"}
  ]);
};
