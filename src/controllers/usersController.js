const User = require("../Models/userModel");
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { Name, lastName, email, password, rol } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      Name,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      rol,
    });
    const savedUser = await newUser.save();

    console.log("succesfully user creation");
    res.status(201).json({
      mensaje: "Succesfully user creation",
      usuario: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // if (user.password !== password) {
    //   return res.status(401).json({ message: "User or password incorrect" });
    // }

    const payload = {
      _id: user._id,
      Name: user.Name,
      rol: user.rol,
    };

    //Create a token
    const generateAccessToken = (payload) => {
      return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "60m" });
    };

    const accessToken = generateAccessToken(payload);

    //Response
    // res.header("authorization", accessToken).json({
    //   token: accessToken,
    // });

    console.log("Succesfully logIn");

    res.status(200).json({
      message: "Succesfully logIn",
      token: accessToken,
    });
  } catch (error) {
    console.error("Error login the user:", error);
    res.status(500).json({ error: "Error login the user" });
  }
};

module.exports = { createUser, logIn };
