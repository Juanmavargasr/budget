const User = require("../Models/userModel");
const db = require("../db");
require("dotenv").config();

const validateUserCreateInfo = async (req, res, next) => {
  const { firstName, lastName, email, password, rol } = req.body;
  try {
    if (!email) {
      res.status(400).json({ error: "email is required" });
    } else {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        res.status(400).json({ error: "email already exist" });
      } else {
        if (!firstName || !lastName || !email || !password || !rol) {
          res.status(400).json({ error: "all data is mandatory" });
        } else {
          console.log("Succesfully validation");
          next();
        }
      }
    }
  } catch (error) {
    console.error("Error validating create info:", error);
    res.status(500).json({ error: "error validating create info" });
  }
};

const validateUserLogInInfo = (req, res, next) => {
  try {
  } catch (error) {
    console.error("Error validateing login info", error);
    res.status(500).json({ error: "error validating login info" });
  }
  next();
};

module.exports = { validateUserCreateInfo, validateUserLogInInfo };
