const irrigationHistoryService = require("../services/irrigationHistoryService");

module.exports = {
    async getAllUserGardensHistory(req, res){
        const userId = req.user_id;

        try{
            const gardensHistory = await irrigationHistoryService.getAllUserGardensHistory(userId);
            return res.status(200).json(gardensHistory);
        } catch(error){
            return res.status(400).json({ message: error.message });
        }
    },

    async getOneGardenHistory(req, res){
        const { name } = req.query;
        const userId = req.user_id;

        if (!name) return res.status(400).json({ message: "O nome da horta é necessário!" });
        
        try{
            const gardenHistory = await irrigationHistoryService.getOneGardenHistory(userId, name);
            return res.status(200).json(gardenHistory);
        } catch(error){
            return res.status(400).json({ message: error.message });
        }
    }
}