const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const auth = require('../middleware/auth')

router
      .get('/user/:id?',auth, UserController.getUsers)

      .post('/user', UserController.createUser)

      .patch('/user/',auth, UserController.updateUser)

      .delete('/user/',auth, UserController.deleteUser)
      

module.exports = router;