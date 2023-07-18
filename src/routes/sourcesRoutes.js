const express = require("express");
const {
  createSource,
  getSources,
} = require("../Controllers/sourcesController");
const { validateSourceCreateInfo } = require("../services/sourcesService");

const router = express.Router();

router.post("/", validateSourceCreateInfo, createSource);
router.get("/", getSources);
router.get("/:id");
router.put("/:id"); //source initalValue can't be changed
router.delete("/:id"); //source can not be deleted, only deactivated

module.exports = router;
