const express = require("express");
const { getAllRoles } = require("../controllers").role;
const router = express.Router();

router.get("/roles", getAllRoles);

module.exports = router;
