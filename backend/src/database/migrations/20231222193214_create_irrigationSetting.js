exports.up = function(knex) {
    return knex.schema.alterTable("irrigationSetting", (table) => {
        table.unique(["userId", "name"], "irrigation_name_unique");
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable("irrigationSetting", (table) => {
        table.dropUnique(["userId", "name"], "irrigation_name_unique")
    })
};