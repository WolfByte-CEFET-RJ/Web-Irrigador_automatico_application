const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router
      .get('/', async (req, res) => {
        res.send('Hello World!')
      })
      .get('/user/:id?', userController.getUsers)
      .post('/user', userController.createUser)
      .patch('/user/:id', userController.updateUser)
      .delete('/user/:id', userController.deleteUser);
      

module.exports = router;