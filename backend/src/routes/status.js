const express = require("express");
const { getAllStatus, login } = require("../controllers").status;
const router = express.Router();

router.get("/status", getAllStatus);

module.exports = router;
