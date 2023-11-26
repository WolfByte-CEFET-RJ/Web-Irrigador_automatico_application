exports.seed = function(knex) {
    return knex('irrigationSetting').del()
      .then(function () {
        return knex('irrigationSetting').insert([
          { name: 'Default Setting', userId: 1 , id: 1},
          { name: 'Setting 2', userId: 2 },
          { name: 'Setting 3', userId: 1 },
          { name: 'Setting 4', userId: 3 },
          { name: 'Setting 5', userId: 2 }
        ]);
      });
  };
  