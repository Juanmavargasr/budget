const express = require("express");
const { createUser } = require("../Controllers/usersController");
const { validateInfo } = require("../services/usersService");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("El endpoint de users está funcional");
});
router.post("/", validateInfo, createUser);
router.get("/:id");
router.put("/:id");
router.delete("/:id");
router.post("/login");
router.post("/login-2fa");

module.exports = router;
