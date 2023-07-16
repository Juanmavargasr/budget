require("dotenv").config();

const validateCreateInfo = (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ error: "all data is mandatory" });
    }
    console.log("Succesfully validation");
    next();
  } catch (error) {
    console.error("Error validating create info:", error);
    res.status(500).json({ error: "error validating create info" });
  }
};

const validateLogInInfo = (req, res, next) => {
  try {
  } catch (error) {
    console.error("Error validateing login info", error);
    res.status(500).json({ error: "error validating login info" });
  }
  next();
};

module.exports = { validateCreateInfo, validateLogInInfo };
