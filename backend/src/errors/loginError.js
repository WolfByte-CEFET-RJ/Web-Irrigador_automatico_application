const { HttpCode, HttpError } = require('../utils/app.error');

class LoginError extends HttpError {
    constructor({httpCode, type, message = 'An error occurred while processing the request in Login entity'}) {
        super({
            httpCode: httpCode,
            message: message,
            type: type
        });
    }
}

class InvalidEmail extends LoginError {
	constructor() {
		super({
			httpCode: HttpCode.BAD_REQUEST,
			type: 'ERR_SERVICE_LOGIN-INVALID-EMAIL',
			message: 'Invalid email'
		});
	}
}

class InvalidPassword extends LoginError {
	constructor() {
		super({
			httpCode: HttpCode.BAD_REQUEST,
			type: 'ERR_SERVICE_LOGIN-INVALID-PASSWORD',
			message: 'Invalid password'
		});
	}
}

module.exports = {
	InvalidEmail,
	InvalidPassword
}