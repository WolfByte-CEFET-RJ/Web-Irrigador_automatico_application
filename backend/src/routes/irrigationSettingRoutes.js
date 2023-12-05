const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const IrrigationSettingController = require('../controllers/irrigationSettingController')

router
  
      .get('/setting/:id?',auth, IrrigationSettingController.getSettings)

module.exports = router;