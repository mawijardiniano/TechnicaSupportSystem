const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Authentication = require("../models/authentication");

const getUsers = async (req, res) => {
  try {
    const getUser = await Authentication.find();
    res.json(getUser);
  } catch (error) {}
};

const userSignup = async (req, res) => {
  try {
    const { name, position, email, password, accountType } = req.body;

    let user = await Authentication.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new Authentication({
      name,
      position,
      email,
      password: hashedPassword,
      accountType,
    });

    await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", email: user.email });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Authentication.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        name: user.name,
        position: user.position,
        email: user.email,
        userId: user._id,
        accountType: user.accountType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "ok",
      data: {
        token,
        name: user.name,
        position: user.position,
        userId: user._id,
        email: user.email,
        accountType: user.accountType,
      },
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Authentication.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ name: user.name, email: user.email, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { userSignup, userLogin, getUsers, getUserProfile };
