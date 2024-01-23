const express = require("express");
const router = express.Router();
const irrgationHistoryController = require("../controllers/irrigationHistoryController");
const auth = require("../middleware/auth");

router
      .get("/history", auth, irrgationHistoryController.getAllUserGardensHistory)
      .get("/history/busca", auth, irrgationHistoryController.getOneGardenHistory)



module.exports = router;