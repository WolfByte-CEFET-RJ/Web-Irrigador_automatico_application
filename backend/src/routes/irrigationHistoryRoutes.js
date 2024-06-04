const express = require("express");
const router = express.Router();
const irrigationHistoryController = require("../controllers/irrigationHistoryController");
const auth = require("../middleware/auth");

router
      .get("/history", auth, irrigationHistoryController.getAllUserGardensHistory)
      .get("/history/busca", auth, irrigationHistoryController.getOneGardenHistory)



module.exports = router;