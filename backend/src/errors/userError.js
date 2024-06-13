const { HttpCode, HttpError } = require('../utils/app.error');

class UserError extends HttpError {
    constructor({httpCode, type, message = 'An error occurred while processing the request in User entity'}) {
        super({
            httpCode: httpCode,
            message: message,
            type: type
        });
    }
}

module.exports = {
    UserError
}