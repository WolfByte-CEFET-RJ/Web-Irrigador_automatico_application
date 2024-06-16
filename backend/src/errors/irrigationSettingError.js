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
    constructor(type){
        super({
            httpCode: HttpCode.NOT_FOUND,
            message: 'Essa configuração de irrigação não pertence à você',
            type: type
        });
    }
}

module.exports = {
    IrrigationSettingError,
    IrrigationSettingNotFound,
    UnauthorizedIrrigationSettingOperation
}