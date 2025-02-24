const express = require("express");
const router = express.Router();
const {
  reportProblem,
  getReports,
  updateStatus,
} = require("../controllers/problemController");

router.get("/get-report", getReports);
router.post("/send-report", reportProblem);
router.put("/update-status/:id", updateStatus);

module.exports = router;
