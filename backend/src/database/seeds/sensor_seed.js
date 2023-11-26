/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('sensor').del()
  .then(function () {
    return knex('sensor').insert([
      { id: 1, name: 'Umidade', unitOfMeasurement: "%" },
      { id: 2, name: 'Temperatura', unitOfMeasurement: "%" }
    ]);
  });
};
