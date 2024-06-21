const { HttpCode, HttpError } = require('../utils/app.error');

class IrrigationHistoryError extends HttpError {
    constructor({httpCode, type, message = 'An error occurred while processing the request in Irrigation History entity'}) {
        super({
            httpCode: httpCode,
            message: message,
            type: type
        });
    }
}

class IrrigationHistoryNotFound extends IrrigationHistoryError{
    constructor(){
        super({
            httpCode: HttpCode.NOT_FOUND,
            message: 'Nenhum histórico de irrigação foi encontrado',
            type: 'ERR_SERVICE_IRRIGATION_HISTORY-NOT_FOUND'
        });
    }
}

class GardenNotInformed extends IrrigationHistoryError{
    constructor(){
        super({
            httpCode: HttpCode.BAD_REQUEST,
            message: 'O nome da horta é necessário!',
            type: 'ERR_CONTROLLER_IRRIGATION_HISTORY-GARDEN_NOT_INFORMED'
        })
    }
}

module.exports = {
    IrrigationHistoryError,
    IrrigationHistoryNotFound,
    GardenNotInformed,
}