const erro400 = require("./erro400Schema");
const erro401 = require("./erro401Schema");
const erro500 = require("./erro500Schema")
const user = require("./userSchemas");

module.exports = {
    ResponseError400: erro400,
    ResponseError401: erro401,
    ResponseError500 : erro500,

    ResponseGetUsers: user.getUsers,
    
    RequestCreateUser: user.createUser,
    ResponseGetUser: user.getUser,
    RequestUpdateUser: user.updateUser,
};