/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex.transaction(async trx => {
     await trx.raw('SET FOREIGN_KEY_CHECKS = 0');
 
     await trx('sensor').del();
     await trx('sensor').insert([
       { id: 1, name: 'Umidade', unitOfMeasurement: "%" },
       { id: 2, name: 'Temperatura', unitOfMeasurement: "%" }
     ]);
 
     await trx.raw('SET FOREIGN_KEY_CHECKS = 1');
  });
 };