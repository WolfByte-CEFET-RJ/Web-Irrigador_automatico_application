const { ValidationError } = require('yup');
const gardenService = require('../services/gardenService');
const measurementService = require('../services/measurementService');
const { HttpCode, HttpError } = require('../utils/app.error');

module.exports = {

    async getGardens(req, res) {
        const { id } = req.params;
        const userId = req.user_id;

        try {
            if (!id) {
                const gardens = await gardenService.getAllGardens();
                return res.status(HttpCode.OK).json(gardens);
            }

            const garden = await gardenService.getOneGarden(id, userId);
            return res.status(HttpCode.OK).json(garden);

        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json(e);
            } 
            
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    },
    async getUserGardens(req, res) {
        const userId = req.user_id;
        try {
            const gardens = await gardenService.getUserGardens(userId);
            return res.status(HttpCode.OK).json(gardens);

        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json(e);
            } 
            
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    },

    async createGarden(req, res) {
        const { name, description, identifier} = req.body;
        const userId = req.user_id;
    
        try {
            const response = await gardenService.createGarden(name, description, identifier, userId);
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

    async updateGarden(req, res) {
        const {id} = req.params; 
        const myId = req.user_id

        const gardenData = req.body;
        try {
            const garden = await gardenService.updateGarden(myId, id, gardenData);
            if (garden) {
                res.json({ message: garden });
            }

        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json(e);
            } 

            if (e instanceof ValidationError){
                return res.status(HttpCode.BAD_REQUEST).json({message: e.message});
            }
                
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    },

    async deleteGarden(req, res) {
        const {id} = req.params; 
        const myId = req.user_id;
        
        try {
            const garden = await gardenService.deleteGarden(myId, id);
            if (garden) {
                res.status(HttpCode.OK).json({ message: garden });
            }

        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json(e);
            } 
            
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    },

    async getMeasuresGarden(req, res) {
        const { id } = req.params;
        const userId = req.user_id;

        try {

            let garden = await gardenService.getOneGarden(id, userId);
            const measurements = await measurementService.lastMeasures(userId, garden.userId, garden.irrigationId, id);
            
            garden['lastMeasures'] = measurements;

            return res.status(HttpCode.OK).json(garden);

        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json(e);
            } 
                
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }, 

    async getMeasuresAllGardens(req, res) {
        const userId = req.user_id;
        
        try {
            let gardens = await gardenService.getUserGardens(userId);
            const measurements = await measurementService.lastMeasuresAllGardens(gardens);

            return res.status(HttpCode.OK).json(measurements);

        } catch (e) {
            if(e instanceof HttpError) {
                return res.status(e.httpCode).json(e);
            } 
             
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
}
