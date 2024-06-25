const jwt = require('jsonwebtoken');
require('dotenv').config();
const { InvalidToken, TokenNotFound } = require('../errors/authError');
const { HttpError, HttpCode } = require('../utils/app.error');

module.exports = (req, res, next) => {
    const authToken = req.headers.authorization;
    
    if(!authToken){
        const error = new TokenNotFound();
        return res.status(error.httpCode).json(error);
    }
        
    const [,token] = authToken.split(" ");

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        
        req.user_id = decodedToken.id;
        req.token = token;
        next();        
    } catch (e) {
        if(e instanceof HttpError){
            return res.status(e.httpCode).json(e);
        }

        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
};