const erro400 = require("./erro400Schema");
const erro401 = require("./erro401Schema");
const erro500 = require("./erro500Schema")
const user = require("./userSchemas");
const garden = require("./gardenSchema")

module.exports = {
    //Schemas relacionados a Erros
    ResponseError400: erro400,
    ResponseError401: erro401,
    ResponseError500 : erro500,

    //Schemas relacionados a  Usuário
    ResponseGetUsers: user.getUsers,
    ResponseGetUser: user.getUser,
    
    RequestCreateUser: user.createUser,
    RequestUpdateUser: user.updateUser,

    //Schemas relacionados a Hortas
    ResponseGetGarden: garden.getGarden,
    
    RequestCreateGarden: garden.createGarden,
    RequestUpdateGarden: garden.updateGarden,

    ResponseGetMeasuresGardens: garden.measuresGardens,
    ResponseGetMeasuresGarden: garden.measuresGarden
};