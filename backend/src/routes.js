const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router
      .get('/', async (req, res) => {
        res.send('Hello World!')
      })
      .get('/user/:id?', userController.getUsers)
      .post('/user', userController.createUser)

module.exports = router;