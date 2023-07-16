const validateInfo = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ error: "all data is mandatory" });
  }
  next();
};

module.exports = { validateInfo };
