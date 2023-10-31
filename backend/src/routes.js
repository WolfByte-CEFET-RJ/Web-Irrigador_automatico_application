const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

router
      .get('/user/:id?', userController.getUsers)

      .post('/user', userController.createUser)
      .post('/login', authController.login)

      .patch('/user/:id', userController.updateUser)

      .delete('/user/:id', userController.deleteUser)
      

module.exports = router;