exports.up = async function(knex) {
    // Remover as colunas existentes
    await knex.schema.alterTable("identifier", async (table) => {
        table.dropForeign("gardenId")
       
    });

    // Adicionar as colunas com as propriedades desejadas
    await knex.schema.alterTable("identifier", async (table) => {
        table.foreign("gardenId").references("id").inTable("garden").onDelete("SET NULL");
        
    });
};

exports.down = async function(knex) {
    // Desfazer as alterações feitas no método up
    await knex.schema.alterTable("identifier", async (table) => {
        table.dropForeign("gardenId")
       
    });

    // Adicionar novamente as colunas removidas
    await knex.schema.alterTable("identifier", async (table) => {
        table.foreign("gardenId").references("id").inTable("garden").onDelete("SET NULL");
        
    });
};
