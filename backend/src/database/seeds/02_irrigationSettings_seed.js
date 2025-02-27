exports.seed = async function(knex) {
  return knex.transaction(async trx => {
     await trx.raw('SET FOREIGN_KEY_CHECKS = 0');
 
     await trx('irrigationSetting').del();
     await trx('irrigationSetting').insert([
       { name: 'Default Setting', userId: null , id: 1}
     ]);
 
     await trx.raw('SET FOREIGN_KEY_CHECKS = 1');
  });
 };