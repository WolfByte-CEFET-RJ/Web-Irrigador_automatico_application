const { HttpCode, HttpError } = require('../utils/app.error');

class ResetTokenError extends HttpError {
    constructor({httpCode, type, message = 'An error occurred while processing the request in ResetToken entity'}) {
        super({
            httpCode: httpCode,
            message: message,
            type: type
        });
    }
}

class InvalidToken extends ResetTokenError {
  constructor() {
    super({
      httpCode: HttpCode.UNAUTHORIZED,
      type: 'ERR_MIDDLEWARE_RESETTOKEN-INVALID-TOKEN',
      message: 'Invalid reset token'
    });
  }
}

class TokenNotFound extends ResetTokenError {
  constructor() {
    super({
      httpCode: HttpCode.UNAUTHORIZED,
      type: 'ERR_MIDDLEWARE_RESETTOKEN-TOKEN-NOT-FOUND',
      message: 'Token not found in request headers'
    });
  }
}

module.exports = {
  InvalidToken,
  TokenNotFound
}
