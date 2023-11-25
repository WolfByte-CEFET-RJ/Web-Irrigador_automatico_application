exports.seed = function(knex) {
    return knex('irrigationSetting').del()
      .then(function () {
        return knex('irrigationSetting').insert([
          { name: 'Setting 1', userId: 1 },
          { name: 'Setting 2', userId: 1 },
          { name: 'Setting 3', userId: 1 },
          { name: 'Setting 4', userId: 1 },
          { name: 'Setting 5', userId: 1 }
        ]);
      });
  };
  