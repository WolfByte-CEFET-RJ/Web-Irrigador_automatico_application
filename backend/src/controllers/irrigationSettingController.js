const irrigationSettingService = require('../services/irrigationSettingService');
const { HttpCode, HttpError } = require('../utils/app.error');
const { ValidationError } = require('yup');

module.exports = {
    async getSettings(req, res) {
    const { id } = req.params;

    try {
        if (!id) {
            const settings = await irrigationSettingService.getSettings();
            return res.status(200).json(settings);
        }

        const myId = req.user_id;
        const setting = await irrigationSettingService.getOneSetting(id, myId);
        return res.status(200).json(setting);

        } catch (error) {
        return res.status(400).json({ message: error.message });
        }   
    },
    async getUserSettings(req, res) {
        const userId = req.user_id;
    
        try {
            const setting = await irrigationSettingService.getUserSettings(userId);
            return res.status(200).json(setting);
    
            } catch (error) {
            return res.status(400).json({ message: error.message });
            }   
        },
    async createIrrigationSetting(req, res) {
        const { name, humidityValue } = req.body;
        const userId = req.user_id;

        try {
            const response = await irrigationSettingService.createIrrigationSetting(name, userId, humidityValue);
            return res.status(HttpCode.CREATED).json({ message: response });

        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json(e);
            } 

            if (e instanceof ValidationError){
                return res.status(HttpCode.BAD_REQUEST).json({ message: e.message });
            }
             
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    },
    async updateIrrigationSetting(req, res) {
        const {id} = req.params; 
        const myId = req.user_id

        const settingData = req.body;
        try {
            const setting = await irrigationSettingService.updateIrrigationSetting(myId, id, settingData);
            if (setting) {
                res.json({ message: setting });
            }

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    async deleteIrrigationSetting(req, res) {
        const userId = req.user_id;
        const { id } = req.params;

        try {
          
            const setting = await irrigationSettingService.deleteIrrigationSetting(id, userId);
            if(setting){
                return res.status(HttpCode.OK).json({ message: 'Configuração deletada com sucesso!' });
            }

        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json(e);
            } 
             
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

}
