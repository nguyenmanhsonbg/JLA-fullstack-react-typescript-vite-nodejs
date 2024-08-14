const express = require("express");
const { getAllVocab, login } = require("../controllers").vocab;
const router = express.Router();

router.get("/vocab", getAllVocab);

module.exports = router;
