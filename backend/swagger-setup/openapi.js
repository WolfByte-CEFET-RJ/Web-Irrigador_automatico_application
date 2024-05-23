const SCHEMAS = require("./schemas/index.js");
const SECURITY_SCHEMES = require("./schemas/securitySchemes.js");

const USER_PATHS = require("./paths/userPaths.js");
const USERS_PATH = require("./paths/usersPaths.js");
const VERIFY_PATH = require("./paths/verifyPaths.js");
const FORGOT_PATH = require("./paths/forgotPaths.js");
const RESET_PATH = require("./paths/resetPaths.js");
const LOGIN_PATH = require("./paths/loginPaths.js");
const CREATE_GARDEN_PATH = require("./paths/createGardenPath"); 
const MY_GARDENS_PATH = require("./paths/myGardenPath");
const GARDEN_PATH = require("./paths/gardenPaths");
const MEASURES_GARDENS_PATH = require("./paths/measuresGardensPath.js");
const MEASURES_GARDEN_PATH = require("./paths/measuresGardenPath.js");
const CREATE_SETTING_PATH = require("./paths/createSettingPath.js");
const GET_ONE_SETTING_PATH = require("./paths/getOneSettingPath.js");
const GET_USERS_SETTING_PATH = require("./paths/getUserSettingPath.js");

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
        name: "WolfByte - Web",
        email: "wolfbytegames@gmail.com",
      }
    },
    externalDocs: {
        description: "Pesquisa e Prototipagem",
        url: "https://docs.google.com/document/d/1ZOw6h07MdLoZnEbsfuC1LLb_xfXNLjHfuz_29Xtl8Fo/edit"
        // MONTAR UM DRIVE COM OS DOCS, O ATRIBUTO SÓ RECEBE 1 LINK
        // https://docs.google.com/document/d/14bgq_BmYfMkKwTuk0kb8C10kXW0ZQl6CEtnAxMSN7SA/edit
        // https://drive.google.com/file/d/1GLH6PAzltESBoO5uRdQrc-eh_nThnK55/view
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

      "/garden": CREATE_GARDEN_PATH, //post only
      "/garden/{id}": GARDEN_PATH ,  //get, delete, and patch
      "/myGardens": MY_GARDENS_PATH,
      "/measures/garden/{id}": MEASURES_GARDEN_PATH,
      "/measures/garden": MEASURES_GARDENS_PATH,

      "/setting": CREATE_SETTING_PATH,
      "/setting/{id}": GET_ONE_SETTING_PATH, 
      "/userSettings": GET_USERS_SETTING_PATH,
    },
    components: {
      schemas: SCHEMAS,
      securitySchemes: SECURITY_SCHEMES
    }
  };

module.exports = openApiDocument;
