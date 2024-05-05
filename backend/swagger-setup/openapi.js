const SCHEMAS = require("./schemas/index.js");
const SECURITY_SCHEMES = require("./schemas/securitySchemes.js");

const USER_PATHS = require("./paths/userPaths.js");
const USERS_PATH = require("./paths/usersPaths.js");
const VERIFY_PATH = require("./paths/verifyPaths.js");

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
      title: "Irrigador Automático - API",
      summary:
        "Documentação da aplicação de um Irrigador Automático. A API tem como objetivo auxiliar no controle de informações e especificações de irrigação do usuário, possibilitando maior flexibilidade. Desenvolvido por: Ramo Estudantil IEEE - WolfByte(Web) - Projeto Bower",
      contact: {
        name: "Projeto Bower - WolfByte",
        email: "---",
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
      "/users": USERS_PATH,
      "/user": USER_PATHS,
      "/verify_code/{email}": VERIFY_PATH
    },
    components: {
      schemas: SCHEMAS,
      securitySchemes: SECURITY_SCHEMES
    }
  };

module.exports = openApiDocument;
