const irrigationSettingService = require('../services/irrigationSettingService');

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
        const { name, humidityValue, waterValue } = req.body;
        const userId = req.user_id;

        try {
            const response = await irrigationSettingService.createIrrigationSetting(name, userId, humidityValue, waterValue);
            return res.status(201).json({ message: response });

        } catch (error) {
            return res.status(400).json({ message: error.message });
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
        const {settingId} = req.params;

        try {
          
            const setting = await irrigationSettingService.deleteIrrigationSetting(settingId, userId);
            if(setting){
                res.json({message: 'Config deletada com sucesso!'})
            }

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

}
