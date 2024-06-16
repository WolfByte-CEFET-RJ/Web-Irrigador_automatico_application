//Enumeração dos status code
const HttpCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    UNPROCESSABLE_CONTENT: 422,
    INTERNAL_SERVER_ERROR: 500,
}


class HttpError extends Error {
    constructor({ httpCode, type, message = 'An error occurred while processing the request' }) {
        super(message);

        this.httpCode = httpCode;
        this.type = type;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            httpCode: this.httpCode,
            type: this.type,
            message: this.message
        };
    }
}

module.exports = { HttpCode, HttpError };