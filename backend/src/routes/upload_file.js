const express = require("express");
const router = express.Router();
const upload = require("../helper/upload-file");
const { uploadFileIntoTheServer } = require("../controllers/upload_file");

router.post("/upload-file", upload.single("file"), uploadFileIntoTheServer);

module.exports = router;
