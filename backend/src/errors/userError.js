const { HttpCode, HttpError } = require('../utils/app.error');

class UserError extends HttpError {
    constructor({ httpCode, type, message = 'An error occurred while processing the request in User entity' }) {
        super({
            httpCode: httpCode,
            message: message,
            type: type
        });
    }
}

class UserNotFound extends UserError {
    constructor() {
        super({
            httpCode: HttpCode.NOT_FOUND,
            type: 'ERR_SERVICE_USER-NOT_FOUND',
            message: 'User not found'
        });
    }
}

class InvalidCode extends UserError {
    constructor() {
        super({
            httpCode: HttpCode.BAD_REQUEST,
            type: 'ERR_SERVICE_USER-INVALID-CODE',
            message: 'Invalid code'
        });
    }
}

class CodeExpired extends UserError {
    constructor() {
        super({
            httpCode: HttpCode.BAD_REQUEST,
            type: 'ERR_SERVICE_USER-CODE-EXPIRED',
            message: 'Code expired'
        });
    }
}

class NoCode extends UserError {
    constructor() {
        super({
            httpCode: HttpCode.BAD_REQUEST,
            type: 'ERR_SERVICE_USER-NO-CODE',
            message: 'Code not found'
        });
    }
}

class PasswordMismatch extends UserError {
    constructor() {
        super({
            httpCode: HttpCode.BAD_REQUEST,
            type: 'ERR_SERVICE_USER-PASSWORD-MISMATCH',
            message: 'Passwords do not match'
        });
    }
}

class AlreadyExists extends UserError {
    constructor() {
        super({
            httpCode: HttpCode.CONFLICT,
            type: 'ERR_SERVICE_USER-ALREADY-EXISTS',
            message: 'User already exists'
        })
    }
}

class NotAllowedChangeEmail extends UserError {
    constructor() {
        super({
            httpCode: HttpCode.CONFLICT,
            type: 'ERR_SERVICE_USER-NOT-ALLOWED-CHANGE-EMAIL',
            message: 'It is not allowed to change the email'
        })
    }
}
module.exports = {
    UserNotFound,
    InvalidCode,
    NoCode,
    CodeExpired,
    PasswordMismatch,
    AlreadyExists,
    NotAllowedChangeEmail
}