exports.up = function(knex) {
    return knex('identifier').truncate()
};

exports.down = function(knex) {
    return Promise.all([
        knex('identifier').insert({value:GenSeed(1)}),
        knex('identifier').insert({value:GenSeed(2)}),
    ])
};
