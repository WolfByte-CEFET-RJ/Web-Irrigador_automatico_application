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

module.exports = {
    IrrigationHistoryError
}