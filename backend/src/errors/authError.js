const { HttpCode, HttpError } = require('../utils/app.error');

class AuthError extends HttpError {
    constructor({httpCode, type, message = 'An error occurred while processing the request in Auth entity'}) {
        super({
            httpCode: httpCode,
            message: message,
            type: type
        });
    }
}

class InvalidToken extends AuthError {
    constructor() {
        super({
            httpCode: HttpCode.UNAUTHORIZED,
            type: 'ERR_MIDDLEWARE_AUTH-INVALID-TOKEN',
            message: 'Invalid auth token'
        });
    }
}

class TokenNotFound extends AuthError {
    constructor() {
        super({
            httpCode: HttpCode.UNAUTHORIZED,
            type: 'ERR_MIDDLEWARE_AUTH-TOKEN-NOT-FOUND',
            message: 'Token not found'
        });
    }
}

module.exports = {
    InvalidToken,
    TokenNotFound
}