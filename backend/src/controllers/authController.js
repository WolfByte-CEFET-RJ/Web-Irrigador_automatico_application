const authService = require("../services/authService");

module.exports = {
    async login(req, res){
        const { email, password } = req.body;

        try{
            const token = await authService.login(email, password);
            return res.status(200).json({ token });
        } catch(error){
            return res.status(400).json({ message: error.message })
        }
    }
}