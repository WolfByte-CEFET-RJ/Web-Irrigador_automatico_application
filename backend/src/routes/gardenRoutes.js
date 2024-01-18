const express = require('express');
const router = express.Router();
const GardenController = require('../controllers/gardenController');
const auth = require('../middleware/auth')

router
      .get('/garden/:id?',auth, GardenController.getGardens)

      .post('/garden',auth, GardenController.createGarden)

      .patch('/garden/:id',auth, GardenController.updateGarden)

      .delete('/garden/:id',auth, GardenController.deleteGarden)

      .get('/measures/garden/:id', auth, GardenController.getMeasuresGarden)
      
      .get('/measures/garden', auth, GardenController.getMeasuresAllGardens)


module.exports = router