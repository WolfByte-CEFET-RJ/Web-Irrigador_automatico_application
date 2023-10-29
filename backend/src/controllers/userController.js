const userService = require('../services/userService');

module.exports = {
    async getUsers(req, res) {
        const { id } = req.params;
        try {
            if (!id) {
                const users = await userService.getAllUsers();
                return res.status(200).json(users);
            }

            const user = await userService.getOneUser(id);
            return res.status(200).json(user);

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },

    async createUser(req, res) {
        const { name, email, password, humidityNotification, waterNotification } = req.body;
        
        try {
            const response = await userService.createUser(name, email, password, humidityNotification, waterNotification);
            return res.status(201).json({message: response});

        } catch (error) {
          return res.status(400).json({message: error.message});
        }
    },
    async updateUser(req, res) {
        const { id } = req.params;
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
        const { id } = req.params;
        try {
          
            const user = await userService.deleteUser(id);
            if(user){
                res.json({message: 'Usuário deletado com sucesso!'})
            }

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
};