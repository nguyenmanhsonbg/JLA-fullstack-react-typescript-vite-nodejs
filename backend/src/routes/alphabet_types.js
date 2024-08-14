const express = require("express");
const { getAllAlphabetTypes } = require("../controllers/alphabet_types");
const router = express.Router();
const { checkAuthAndRole } = require("../middleware/auth");

router.get("/alphabet_types", checkAuthAndRole([1, 2, 3, 4]), getAllAlphabetTypes);

module.exports = router;
