const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const gardenController= require('./controllers/gardenController');
const authController = require('./controllers/authController');
const irrigationSettingController = require('./controllers/irrigationSettingController')
const auth = require('./middleware/auth');
router
      .get('/user/:id?',auth, userController.getUsers)
      .get('/garden/:id?',auth, gardenController.getGardens)
      .get('/setting/:id?',auth, irrigationSettingController.getSettings)

      .post('/user', userController.createUser)
      .post('/login', authController.login)
      .post('/garden',auth, gardenController.createGarden)

      .patch('/user/',auth, userController.updateUser)
      .patch('/garden/:id',auth, gardenController.updateGarden)

      .delete('/user/',auth, userController.deleteUser)
      .delete('/garden/:id',auth, gardenController.deleteGarden)
      

module.exports = router;