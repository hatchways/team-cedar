const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { createPetSitter, getAllPetSitter, updatePetSitterById } = require("../controllers/petSitter");

router.route("/").get(protect, getAllPetSitter).post(protect, createPetSitter);
router.route("/:id/edit").put(protect, updatePetSitterById);

module.exports = router;