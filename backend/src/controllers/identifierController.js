const identifierService = require('../services/identifierService');

module.exports = {
    async getIdentifiers(req, res) {
    const { id } = req.params;

    try {
        if (!id) {
            const identifier = await identifierService.getIdentifiers();
            return res.status(200).json(identifier);
        }

        const identifier = await identifierService.getOneIdentifier(id);
        return res.status(200).json(identifier);

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}}
