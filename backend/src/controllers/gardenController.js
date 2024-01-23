const gardenService = require('../services/gardenService');
const measurementService = require('../services/measurementService');

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
    async getUserGardens(req, res) {
        const userId = req.user_id;
        try {

            const gardens = await gardenService.getUserGardens(userId);
            return res.status(200).json(gardens);

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async createGarden(req, res) {
        const { name, description, identifier} = req.body;
        const userId = req.user_id;

        try {
            const response = await gardenService.createGarden(name, description, identifier, userId);
            return res.status(201).json({ message: response });

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async updateGarden(req, res) {
        const {id} = req.params; 
        const myId = req.user_id

        const gardenData = req.body;
        try {
            const garden = await gardenService.updateGarden(myId, id, gardenData);
            if (garden) {
                res.json({ message: garden });
            }

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async deleteGarden(req, res) {
        const {id} = req.params; 
        const myId = req.user_id;
        
        try {
            const garden = await gardenService.deleteGarden(myId, id);
            if (garden) {
                res.json({ message: garden });
            }

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getMeasuresGarden(req, res) {
        const { id } = req.params;

        try {

            let garden = await gardenService.getOneGarden(id);
            const measurements = await measurementService.lastMeasures(id);
            
            garden['lastMeasures'] = measurements;

            return res.status(200).json(garden);

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }, 

    async getMeasuresAllGardens(req, res) {
        
        try {
            let gardens = await gardenService.getAllGardens();
            const measurements = await measurementService.lastMeasuresAllGardens(gardens);

            return res.status(200).json(measurements);

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}