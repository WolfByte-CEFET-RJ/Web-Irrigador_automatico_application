const { HttpCode, HttpError } = require('../utils/app.error');

class GardenError extends HttpError {
    constructor({httpCode, type, message = 'An error occurred while processing the request in Garden entity'}) {
        super({
            httpCode: httpCode,
            message: message,
            type: type
        });
    }
}

module.exports = {
    GardenError
}