const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authentication");
const { userLogin, userSignup } = require("../controllers/userController");

router.post("/signup", userSignup);
router.post("/login", userLogin);

module.exports = router;
