const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const auth = require('./middleware/auth');
router
      .get('/user/:id?',auth, userController.getUsers)

      .post('/user', userController.createUser)
      .post('/login', authController.login)

      .patch('/user',auth, userController.updateUser)

      .delete('/user/',auth, userController.deleteUser)
      

module.exports = router;