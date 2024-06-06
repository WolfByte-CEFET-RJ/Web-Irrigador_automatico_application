const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

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
            return res.status(200).json(user);
        } catch(error){
            return res.status(400).json({message: error.message});
        }
    },

    async createUser(req, res) {
        const { name, email, password, humidityNotification } = req.body;
        
        try {
            const response = await userService.createUser(name, email, password, humidityNotification);
            return res.status(201).json({message: response});

        } catch (error) {
          return res.status(400).json({message: error.message});
        }
    },
    async updateUser(req, res) {

        const id = req.user_id;
       
        const userData = req.body;
        try {
           
            const user = await userService.updateUser(id, userData);
            if(user){
                res.json({message: 'Usuário atualizado com sucesso'})
            }

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },
    async deleteUser(req, res) {
        const id = req.user_id;

        try {
          
            const user = await userService.deleteUser(id);
            if(user){
                res.json({message: 'Usuário deletado com sucesso!'})
            }

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },
    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const response = await userService.forgotPassword(email);
            return res.status(200).json({message: response});
            
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },
    async verifyCodeAndGenerateToken(req, res) {
        const { email } = req.params;
        const { code } = req.body;

        try {
            const isValidCode = await userService.verifyCode(email, code);
            if (!isValidCode) {
                return res.status(400).json({message: 'Código inválido!'});
            }

            const resetToken = jwt.sign({ email, type: 'reset' }, process.env.TOKEN_KEY, { expiresIn: '15m' });
            
            return res.status(200).json({ resetToken });
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },
    async resetPassword(req, res) {
        try {
            if (!req.headers['x-reset-token']) {
                return res.status(400).json({ message: 'Token não encontrado nos cabeçalhos da requisição' });
            }
            const resetToken = req.headers['x-reset-token'];
            const { password, confirmPassword } = req.body;
            try {
                const decodedToken = jwt.verify(resetToken, process.env.TOKEN_KEY);
                if (decodedToken.type !== 'reset') {
                    throw new Error('Token inválido para redefinição de senha');
                }
                
                const { email } = decodedToken;
                const response = await userService.resetPassword(email, password, confirmPassword);
                
                return res.status(200).json({ message: response });
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};