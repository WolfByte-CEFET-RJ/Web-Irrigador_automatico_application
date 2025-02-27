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
    constructor(type = 'ERR_SERVICE_IRRIGATION-SERVICE_IRRIGATION-SETTING-NOT-FOUND'){
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

class DefaultSettingNotEditable extends IrrigationSettingError {
    constructor(){
        super({
            httpCode: HttpCode.UNAUTHORIZED,
            message: 'Você não pode alterar uma configuração padrão!',
            type: 'ERR_SERVICE_IRRIGATION-DEFAULT_NOT_EDITABLE'
        })
    }
}

class UserIdNotEditable extends IrrigationSettingError {
    constructor(){
        super({
            httpCode: HttpCode.UNAUTHORIZED,
            message: 'Você não pode alterar o userId.',
            type: 'ERR_SERVICE_IRRIGATION-USER_ID_NOT_EDITABLE'
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

class NoValuePassed extends IrrigationSettingError {
    constructor(message = 'Nenhum valor foi passado!'){
        super({
            httpCode: HttpCode.BAD_REQUEST,
            message: message,
            type: 'ERR_SERVICE_IRRIGATION-NO_VALUE_PASSED'
        })
    }
}

class InvalidUpdateFields extends IrrigationSettingError {
    constructor(message = 'Alguns campos inseridos não fazem parte da estrutura de uma configuração de irrigação!'){
        super({
            httpCode: HttpCode.BAD_REQUEST,
            message: message,
            type: 'ERR_SERVICE_IRRIGATION-NO_VALUE_PASSED'
        })
    }
}

class IrrigationSettingAlreadyExists extends IrrigationSettingError {
    constructor(message = 'Já existe uma configuração com esse nome!'){
        super({
            httpCode: HttpCode.BAD_REQUEST,
            message: message,
            type: 'ERR_SERVICE_IRRIGATION-IRRIGATION_SETTING_ALREADY_EXISTS'
        })
    }
}

class UpdateUmidityValueError extends IrrigationSettingError {
    constructor(message = 'Erro ao alterar o valor da umidade!'){
        super({
            httpCode: HttpCode.BAD_REQUEST,
            message: message,
            type: 'ERR_SERVICE_IRRIGATION-UPDATE_UMIDITY_VALUE'
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
    NothingToDeleteError,
    DefaultSettingNotEditable,
    NoValuePassed,
    InvalidUpdateFields,
    UserIdNotEditable,
    IrrigationSettingAlreadyExists,
    UpdateUmidityValueError
}