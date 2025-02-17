const express = require("express");
const router = express.Router();

const { reportProblem,getReports } = require("../controllers/problemController");

router.get("/get-report", getReports);
router.post("/send-report", reportProblem);

module.exports = router;
