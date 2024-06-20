const irrigationHistoryService = require("../services/irrigationHistoryService");
const { HttpCode, HttpError } = require("../utils/app.error");

module.exports = {
    async getAllUserGardensHistory(req, res){
        const userId = req.user_id;

        try{
            const gardensHistory = await irrigationHistoryService.getAllUserGardensHistory(userId);
            return res.status(200).json(gardensHistory);
        } catch(e){
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json(e);
            } 
             
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
					code: HttpCode.INTERNAL_SERVER_ERROR,
					message: e.message,
					type: 'ERR_CONTROLLER_GARDEN_HISTORY-INTERNAL' 
			});
        }
    },

    async getOneGardenHistory(req, res){
        const { name } = req.query;
        const userId = req.user_id;

        if (!name) return res.status(400).json({ message: "O nome da horta é necessário!" });
        
        try{
            const gardenHistory = await irrigationHistoryService.getOneGardenHistory(userId, name);
            return res.status(200).json(gardenHistory);
        } catch(e){
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json(e);
            } 
             
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
                code: HttpCode.INTERNAL_SERVER_ERROR,
                message: e.message,
                type: 'ERR_CONTROLLER_GARDEN_HISTORY-INTERNAL' 
        });
        }
    }
}