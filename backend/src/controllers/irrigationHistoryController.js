const irrigationHistoryService = require("../services/irrigationHistoryService");

module.exports = {
    async getAllUserGardensHistory(req, res){
        try{
            const gardensHistory = await irrigationHistoryService.getAllGardenHistory();
            return res.status(200).json(gardensHistory);
        } catch(error){
            return res.status(400).json({ message: error.message });
        }
    },

    async getOneGardenHistory(req, res){
        try{
            const gardenHistory = await irrigationHistoryService.getOneGardenHistory();
            return res.status(200).json(gardenHistory);
        } catch(error){
            return res.status(400).json({ message: error.message });
        }
    }
}