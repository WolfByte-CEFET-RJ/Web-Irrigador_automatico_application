const security = require("./securitySchemes")
const erro400 = require("./erro400Schema");
const erro401 = require("./erro401Schema");
const user = require("./userSchemas");

module.exports = {
    schemas: {
      ResponseError400: erro400,
      ResponseError401: erro401,
      RequestUser: user.RequestUser,
      ResponseUser: user.ResponseUser
    },
    securitySchemes: security
};