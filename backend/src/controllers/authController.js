const authService = require("../services/authService");
const { HttpCode, HttpError } = require('../utils/app.error');

module.exports = {
    async login(req, res){
        const { email, password } = req.body;

        try{
            const token = await authService.login(email, password);
            return res.status(HttpCode.OK).json({ token });
        } catch(e){
            if (e instanceof HttpError){
                return res.status(e.httpCode).json({ code: e.httpCode, message: e.message, type: e.type });
            } else {
                return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    message: e.message,
                    type: 'ERR_SERVICE_LOGIN-INTERNAL-SERVER-ERROR'
                });
            }
        }
    }
}