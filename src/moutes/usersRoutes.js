const express = require("express");
const { createUser, logIn } = require("../Controllers/usersController");
const {
  validateCreateInfo,
  validateLogInInfo,
} = require("../services/usersService");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Endpoint users working");
});
router.post("/", validateCreateInfo, createUser);
router.get("/:id");
router.put("/:id");
router.delete("/:id");
router.post("/login", validateLogInInfo, logIn);
router.post("/login-2fa");

module.exports = router;
