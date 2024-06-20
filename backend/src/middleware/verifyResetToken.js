const jwt = require('jsonwebtoken');
const { HttpCode, HttpError } = require('../utils/app.error');
const { ValidationError } = require('yup');
const { InvalidToken, TokenNotFound } = require('../errors/resetTokenError');

module.exports = (req, res, next) => {
    const resetToken = req.headers['x-reset-token'];

    if (!resetToken) {
        throw new TokenNotFound();
    }

    try {
        const decodedToken = jwt.verify(resetToken, process.env.TOKEN_KEY);

        if (decodedToken.type !== 'reset') {
            throw new InvalidToken();
        }

        req.email = decodedToken.email;
        next();
    } catch (e) {
        if (e instanceof HttpError){
            return res.status(e.httpCode).json(e);
        }

        if (e instanceof ValidationError){
            return res.status(HttpCode.BAD_REQUEST).json({ message: e.message });
        }

        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
};