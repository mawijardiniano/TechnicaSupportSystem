const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authentication");
const { userLogin, userSignup,getUsers, getUserProfile  } = require("../controllers/userController");

router.get("/get-users", getUsers);
router.get("/me", getUserProfile);
router.post("/signup", userSignup);
router.post("/login", userLogin);

module.exports = router;
