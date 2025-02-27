const user = require("./userSchemas");
const erro400History = require("./erro400HistorySchema");
const garden = require("./gardenSchema")
const setting = require("./settingsSchemas")
const history = require("./historySchema");
const erro = require("./genericErrorFormat")

module.exports = {
    //Schemas relacionados a Erros
    ResponseError: erro,
    ResponseError400History: erro400History,

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