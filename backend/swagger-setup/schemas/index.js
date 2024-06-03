const erro400 = require("./erro400Schema");
const erro400History = require("./erro400HistorySchema");
const erro401 = require("./erro401Schema");
const erro500 = require("./erro500Schema")
const user = require("./userSchemas");
const garden = require("./gardenSchema")
const setting = require("./settingsSchemas")
const history = require("./historySchema");

module.exports = {
    //Schemas relacionados a Erros
    ResponseError400: erro400,
    ResponseError400History: erro400History,
    ResponseError401: erro401,
    ResponseError500 : erro500,

    //Schemas relacionados ao Usuário
    ResponseGetUsers: user.getUsers,
    ResponseGetUser: user.getUser,
    
    RequestCreateUser: user.createUser,
    RequestUpdateUser: user.updateUser,

    //Schemas relacionados a Hortas
    ResponseGetGarden: garden.getGarden,
    
    RequestCreateGarden: garden.createGarden,
    RequestUpdateGarden: garden.updateGarden,

    ResponseGetMeasuresGardens: garden.measuresGardens,
    ResponseGetMeasuresGarden: garden.measuresGarden,

    //Schemas relacionados a Configurações de Irrigação
    ResponseGetSetting: setting.getSetting,
    RequestCreateSetting: setting.createSetting,
    RequestUpdateSetting: setting.updateSetting,

    //Schema relacionado a Histórico de Irrigação
    ResponseGetHistory:  history.getHistory
};