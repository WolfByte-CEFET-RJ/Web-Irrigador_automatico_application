
exports.seed = async function(knex) {
  return knex('configSensor').del()
    .then(function () {
      return knex('configSensor').insert([
        { sensorId: 1, irrigationSettingId: 1, value: '50' },
        { sensorId: 2, irrigationSettingId: 1, value: '30' },
      ]);
    });
};