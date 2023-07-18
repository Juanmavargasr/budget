const Source = require("../Models/sourceModel");
const User = require("../Models/userModel");
const { findById } = require("../Models/userModel");
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getSources = async (req, res) => {
  res.status(200).json(results);
};

const createSource = async (req, res) => {
  const { name, initialValue } = req.body;
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const sourceOwner = await User.findById(decodedToken._id);

    const newSource = new Source({
      name,
      initialValue,
    });

    await newSource.save();
    sourceOwner.source.push(newSource);
    await sourceOwner.save();
    // await sourceOwner.save();

    console.log("Succesfully source creation");
    res.status(200).json({
      mensaje: "Succesfully source creation",
      Source: newSource,
    });
  } catch (error) {
    console.error("Error creating source: ", error);
    res.status(500).json({ error: "error" });
  }
};

module.exports = { createSource, getSources };
