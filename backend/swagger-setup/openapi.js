const SCHEMAS = require("./schemas/index.js");
const SECURITY_SCHEMES = require("./schemas/securitySchemes.js");

const USER_PATHS = require("./paths/userPaths.js");
const USERS_PATH = require("./paths/usersPaths.js");
const VERIFY_PATH = require("./paths/verifyPaths.js");
const FORGOT_PATH = require("./paths/forgotPaths.js");
const RESET_PATH = require("./paths/resetPaths.js");
const LOGIN_PATH = require("./paths/loginPaths.js");

/**
 * Lidando com o swagger document como um object para aplicar mais modularização
 */
const openApiDocument = {
    openapi: "3.1.0",
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server (strictly local)",
      },
    ],
    info: {
      version: "1.0.0",
      title: "Smart Garden",
      summary:
        "Smart Garden is an intuitive and efficient API used for managing automatic irrigators. This application provides endpoints to control user irrigation details and specifications. It enables greater flexibility in managing automatic irrigation systems, allowing users to monitor their garden status and adjust irrigation settings remotely. Developed by: Ramo Estudantil IEEE - WolfByte(Web) - Bower Project",
      contact: {
        name: "Bower Project - WolfByte",
        email: "---",
      },
      termsOfService: "---",
      license: {
        name: "License agreement",
        identifier: "---",
      },
    },
    externalDocs: {
      description: "Related documents",
      url: "---",
    },
    tags: [
      {
        name: "User",
        description: "User management and identification services",
      },
      {
        name: "Garden",
        description: "User garden management services",
      },
      {
        name: "Irrigation Settings",
        description: "Irrigation setting management services",
      },
      {
        name: "Irrigation History",
        description: "Irrigation history viewing services",
      },
    ],
    paths: {
      "/users": USERS_PATH,
      "/user": USER_PATHS,
      "/login": LOGIN_PATH,
      "/forgot_password": FORGOT_PATH,
      "/verify_code/{email}": VERIFY_PATH,
      "/reset_password": RESET_PATH,
    },
    components: {
      schemas: SCHEMAS,
      securitySchemes: SECURITY_SCHEMES
    }
  };

module.exports = openApiDocument;
