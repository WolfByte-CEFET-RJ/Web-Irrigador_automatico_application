/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('sensor').del()
  .then(function () {
    return knex('sensor').insert([
      { name: 'Umidade', unitOfMeasurement: "%" },
      { name: 'Temperatura', unitOfMeasurement: "%" }
    ]);
  });
};
