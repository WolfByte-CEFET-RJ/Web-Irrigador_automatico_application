const authService = require("../services/authService");
const { HttpCode, HttpError } = require('../utils/app.error');
const { ValidationError } = require('yup');

module.exports = {
    async login(req, res){
        const { email, password } = req.body;

        try{
            const token = await authService.login(email, password);
            return res.status(HttpCode.OK).json({ token });
        } catch(e){
            if (e instanceof HttpError){
                return res.status(e.httpCode).json(e);
            }

            if (e instanceof ValidationError){
                return res.status(HttpCode.BAD_REQUEST).json({ message: e.message });
            }

            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
}