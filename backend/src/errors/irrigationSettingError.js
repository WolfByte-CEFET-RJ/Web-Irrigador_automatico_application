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

module.exports = {
    IrrigationSettingError
}