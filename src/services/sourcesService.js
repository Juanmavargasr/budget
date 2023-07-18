const Source = require("../Models/sourceModel");

const validateSourceCreateInfo = async (req, res, next) => {
  try {
    const { name, initialValue } = req.body;

    if (!name || !initialValue) {
      res.status(400).json({ error: "all data is mandatory" });
    } else {
      console.log("Succesfully validation");
      next();
    }
  } catch (error) {
    console.error("Error validating create info:", error);
    res.status(500).json({ error: "error validating create info" });
  }
};

module.exports = { validateSourceCreateInfo };
