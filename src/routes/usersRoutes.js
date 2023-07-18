const express = require("express");
const { createUser, logIn } = require("../Controllers/usersController");
const {
  validateUserCreateInfo,
  validateUserLogInInfo,
} = require("../services/usersService");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Endpoint users working");
});
router.post("/", validateUserCreateInfo, createUser);
router.get("/:id");
router.put("/:id");
router.delete("/:id");
router.post("/login", validateUserLogInInfo, logIn);
router.post("/login-2fa");

module.exports = router;
