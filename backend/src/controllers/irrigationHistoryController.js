const { GardenNotInformed } = require("../errors/irrigationHistoryError");
const irrigationHistoryService = require("../services/irrigationHistoryService");
const { HttpCode, HttpError } = require("../utils/app.error");

module.exports = {
    async getAllUserGardensHistory(req, res){
        const userId = req.user_id;

        try{
            const gardensHistory = await irrigationHistoryService.getAllUserGardensHistory(userId);
            return res.status(HttpCode.OK).json(gardensHistory);
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

        try{
            if (!name) throw new GardenNotInformed()
            
            const gardenHistory = await irrigationHistoryService.getOneGardenHistory(userId, name);
            return res.status(HttpCode.OK).json(gardenHistory);
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