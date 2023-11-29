const irrigationSettingService = require('../services/irrigationSettingService');

module.exports = {
    async getSettings(req, res) {
    const { id } = req.params;

    try {
        if (!id) {
            const settings = await irrigationSettingService.getSettings();
            return res.status(200).json(settings);
        }

        const setting = await irrigationSettingService.getOneSetting(id);
        return res.status(200).json(setting);

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}}
