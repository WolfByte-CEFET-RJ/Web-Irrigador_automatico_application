const SCHEMAS = require("./schemas/index.js");
const SECURITY_SCHEMES = require("./schemas/securitySchemes.js");
const USER_PATHS = require("./paths/userPaths.js");
const USERS_PATHS = require("./paths/usersPaths.js");

/**
 * Lidando com o swagger document como um object para aplicar mais modularização
 */
const openApiDocument = {
    openapi: "3.1.0",
    servers: [
      {
        url: "http://localhost:5000",
        description: "Servidor de desenvolvimento estritamente local",
      },
    ],
    info: {
      version: "1.0.0",
      title: "Irrigador Automáticoooo - API",
      summary:
        "Documentação da aplicação de um Irrigador Automático. Tem como objetivo auxiliar no controle de informações e especificações de irrigação do usuário, possibilitando maior flexibilidade.\n\nDesenvolvido por: Ramo Estudantil IEEE - WolfByte(Web)",
      contact: {
        name: "Projeto Bower - WolfByte",
        email: "gustavoandrade0125@gmail.com",
      },
      termsOfService: "---",
      license: {
        name: "Licença de Uso",
        identifier: "---",
      },
    },
    externalDocs: {
      description: "Documentos adicionais",
      url: "---",
    },
    tags: [
      {
        name: "Usuário",
        description: "Serviços de gestão e identificação de usuários",
      },
      {
        name: "Jardim",
        description: "Serviços de gestão dos jardins do usuário",
      },
      {
        name: "Configuração de Irrigação",
        description: "Serviços de gestão das configurações de irrigação",
      },
      {
        name: "Histórico de Irrigação",
        description: "Serviços visualização de históricos de irrigação",
      },
    ],
    paths: {
      "/users": USERS_PATHS,
      "/user": USER_PATHS
    },
    components: SCHEMAS,
  };

module.exports = openApiDocument;
