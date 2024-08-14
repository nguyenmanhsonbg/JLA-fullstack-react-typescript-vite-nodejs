const express = require("express");
const {
	getAllAlphabet,
	getAllAlphabetByTypeId,
	getAllHigaAlphabet,
	getAllKataAlphabet,
} = require("../controllers/alphabet");

const router = express.Router();
const { checkAuthAndRole } = require("../middleware/auth");

router.get("/all_alphabet", checkAuthAndRole([1, 2, 3, 4]), getAllAlphabet);
router.get("/alphabet", checkAuthAndRole([1, 2, 3, 4]), getAllAlphabetByTypeId);
router.get("/hiragana_alphabet", checkAuthAndRole([1, 2, 3, 4]), getAllHigaAlphabet);
router.get("/katakana_alphabet", checkAuthAndRole([1, 2, 3, 4]), getAllKataAlphabet);

module.exports = router;
