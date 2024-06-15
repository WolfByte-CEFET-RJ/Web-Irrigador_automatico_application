const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const { HttpCode, HttpError } = require('../utils/app.error');
const { InvalidCode } = require('../errors/userError')

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },

    async getUser(req, res){
        const userId = req.user_id;

        try{
            const user = await userService.getUser(userId);
            return res.status(HttpCode.OK).json(user);
        } catch(e){
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json({ code: e.httpCode, message: e.message, type: e.type});
            } else {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
					code: HttpCode.INTERNAL_SERVER_ERROR,
					message: e.message,
					type: 'ERR_CONTROLLER_USER_INTERNAL' 
				});
            }
        }
    },

    async createUser(req, res) {
        const { name, email, password, humidityNotification } = req.body;
        
        try {
            const response = await userService.createUser(name, email, password, humidityNotification);
            return res.status(HttpCode.CREATED).json({message: response});

        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json({ code: e.httpCode, message: e.message, type: e.type });
            } else {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
					code: HttpCode.INTERNAL_SERVER_ERROR,
					message: e.message,
					type: 'ERR_CONTROLLER_USER_INTERNAL' 
				});
            }
        }
    },
    async updateUser(req, res) {

        const id = req.user_id;
       
        const userData = req.body;
        try {
           
            const user = await userService.updateUser(id, userData);
            if(user){
                res.status(HttpCode.OK).json({message: 'Usuário atualizado com sucesso'})
            }

        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json({ code: e.httpCode, message: e.message, type: e.type });
            } else {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
					code: HttpCode.INTERNAL_SERVER_ERROR,
					message: e.message,
					type: 'ERR_CONTROLLER_USER_INTERNAL' 
				});
            }
        }
    },
    async deleteUser(req, res) {
        const id = req.user_id;

        try {
          
            const user = await userService.deleteUser(id);
            if(user){
                res.status(HttpCode.OK).json({message: 'Usuário deletado com sucesso!'})
            }

        } catch (error) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json({ code: e.httpCode, message: e.message, type: e.type });
            } else {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
					code: HttpCode.INTERNAL_SERVER_ERROR,
					message: e.message,
					type: 'ERR_CONTROLLER_USER_INTERNAL' 
				});
            }
        }
    },
    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const response = await userService.forgotPassword(email);
            return res.status(HttpCode.OK).json({message: response});
        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(error.httpCode).json({ code: e.httpCode, message: e.message, type: e.type });
            } else {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
					code: HttpCode.INTERNAL_SERVER_ERROR,
					message: e.message,
					type: 'ERR_CONTROLLER_USER_INTERNAL' 
				});
            }
        }
    },
    async verifyCodeAndGenerateToken(req, res) {
        const { email } = req.params;
        const { code } = req.body;

        try {
            const isValidCode = await userService.verifyCode(email, code);
            if (!isValidCode) {
                throw new InvalidCode();
            }
            const resetToken = jwt.sign({ email, type: 'reset' }, process.env.TOKEN_KEY, { expiresIn: '15m' });
            return res.status(HttpCode.OK).json({ resetToken });
        } catch (e) {
            if (e instanceof HttpError) {
                res.status(e.httpCode).json({ code: e.httpCode, message: e.message, type: e.type });
            } else {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
					code: HttpCode.INTERNAL_SERVER_ERROR,
					message: e.message,
					type: 'ERR_CONTROLLER_USER_INTERNAL' 
				});
            }
        }
    },
    async resetPassword(req, res) {
        const { password, confirmPassword } = req.body;
        const email = req.email;

        try {
            const response = await userService.resetPassword(email, password, confirmPassword);
            return res.status(HttpCode.OK).json({ message: response });
        } catch (e) {
            if (e instanceof HttpError) {
                res.status(e.httpCode).json({ code: e.httpCode, message: e.message, type: e.type });
            } else {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
					code: HttpCode.INTERNAL_SERVER_ERROR,
					message: e.message,
					type: 'ERR_CONTROLLER_USER_INTERNAL' 
				});
            }
        }
    }
};