const express = require('express');
const router = express.Router();
const identifierController = require('../controllers/identifierController')
const auth = require('../middleware/auth');
router
  

      .get('/identifier/:id?', identifierController.getIdentifiers)

module.exports = router;