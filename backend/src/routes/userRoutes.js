const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router
      .get('/user/:id?',auth, UserController.getUsers)

      .post('/user', UserController.createUser)

      .post('/forgot_password', UserController.forgotPassword)

      .post('/verify_code/:email', userController.verifyCode)

      .post('/reset_password/:email', UserController.resetPassword)

      .patch('/user/',auth, UserController.updateUser)

      .delete('/user/',auth, UserController.deleteUser)
      

module.exports = router;