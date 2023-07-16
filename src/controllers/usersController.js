const User = require("../Models/userModel");
const db = require("../db");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({ firstName, lastName, email, password });
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

module.exports = { createUser };
