const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const auth = require('../middleware/auth');
const verifyResetToken = require('../middleware/verifyResetToken');
const userController = require('../controllers/userController');

router
      .get('/users',auth, UserController.getAllUsers)

      .get('/user', auth, userController.getUser)

      .post('/user', UserController.createUser)

      .post('/forgot_password', UserController.forgotPassword)

      .post('/verify_code/:email', UserController.verifyCodeAndGenerateToken)

      .post('/reset_password', verifyResetToken, UserController.resetPassword)

      .patch('/user/',auth, UserController.updateUser)

      .delete('/user/',auth, UserController.deleteUser)
      

module.exports = router;