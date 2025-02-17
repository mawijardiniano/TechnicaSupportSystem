const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/userModel");

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", name: user.name });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET
    );
    console.log("Generated token:", token);
    console.log("User data:", user);

    res.status(200).json({
      status: "ok",
      data: {
        token,
        userId: user._id,
        email: user.email,
      },
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { userSignup, userLogin };
