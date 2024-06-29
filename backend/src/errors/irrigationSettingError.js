const { HttpCode, HttpError } = require('../utils/app.error');

class IrrigationSettingError extends HttpError {
    constructor({httpCode, type, message = 'An error occurred while processing the request in Irrigation Setting entity'}) {
        super({
            httpCode: httpCode,
            message: message,
            type: type
        });
    }
}

class IrrigationSettingNotFound extends IrrigationSettingError {
    constructor(type){
        super({
            httpCode: HttpCode.NOT_FOUND,
            message: 'Esta configuração de irrigação não existe',
            type: type
        });
    }
}

class UnauthorizedIrrigationSettingOperation extends IrrigationSettingError {
    constructor(type = 'ERR_SERVICE_IRRIGATION-SERVICE_UNAUTHORIZED-IRRIGATION-SETTING-OPERATION'){
        super({
            httpCode: HttpCode.NOT_FOUND,
            message: 'Essa configuração de irrigação não pertence à você',
            type: type
        });
    }
}

class DuplicatedIrrigatonSettingName extends IrrigationSettingError {
    constructor(){
        super({
            httpCode: HttpCode.BAD_REQUEST,
            message: 'Você já criou uma configuração de irrigação com este nome!',
            type: 'ERR_SERVICE_IRRIGATION-SETTING_DUPLICATED-NAME'
        })
    }
}

class InvalidHumidity extends IrrigationSettingError {
    constructor(){
        super({
            httpCode: HttpCode.BAD_REQUEST,
            message: 'Valor de umidade inválido!',
            type: 'ERR_SERVICE_IRRIGATION-SETTING_INVALID-HUMIDY'
        })
    }
}

class DefaultSettingNotDeleteable extends IrrigationSettingError {
    constructor(){
        super({
            httpCode: HttpCode.UNAUTHORIZED,
            message: 'Você não pode apagar uma configuração padrão!',
            type: 'ERR_SERVICE_IRRIGATION-DEFAULT_NOT_DELETEABLE'
        })
    }
}

class NothingToDeleteError extends IrrigationSettingError {
    constructor(message = 'Erro estrutural ao deletar configuração'){
        super({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            message: message,
            type: 'ERR_SERVICE_IRRIGATION-NOTHING_TO_DELETE'
        })
    }
}

module.exports = {
    IrrigationSettingError,
    IrrigationSettingNotFound,
    UnauthorizedIrrigationSettingOperation,
    DuplicatedIrrigatonSettingName,
    InvalidHumidity,
    DefaultSettingNotDeleteable,
    NothingToDeleteError
}