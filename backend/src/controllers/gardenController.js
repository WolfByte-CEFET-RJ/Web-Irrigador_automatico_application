const gardenService = require('../services/gardenService');

module.exports = {

    async getGardens(req, res) {
        const { id } = req.params;

        try {
            if (!id) {
                const gardens = await gardenService.getAllGardens();
                return res.status(200).json(gardens);
            }

            const garden = await gardenService.getOneGarden(id);
            return res.status(200).json(garden);

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async createGarden(req, res) {
        const { name, description, identifier, userId, configId } = req.body;

        try {
            const response = await gardenService.createGarden(name, description, identifier, userId, configId);
            return res.status(201).json({ message: response });

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async updateGarden(req, res) {
        const {id} = req.params; 

        const gardenData = req.body;
        try {
            const garden = await gardenService.updateGarden(id, gardenData);
            if (garden) {
                res.json({ message: 'Horta atualizado com sucesso' });
            }

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async deleteGarden(req, res) {
        const {id} = req.params; 

        try {
            const garden = await gardenService.deleteGarden(id);
            if (garden) {
                res.json({ message: 'Horta deletado com sucesso!' });
            }

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}