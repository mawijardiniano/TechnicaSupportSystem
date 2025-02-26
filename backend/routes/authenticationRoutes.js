const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authentication");
const { userLogin, userSignup, getUsers , getUserProfile, deleteUser} = require("../controllers/authentication");

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/get-users", getUsers);
router.get("/me", getUserProfile);
router.delete("/delete/:id", deleteUser)

module.exports = router;
