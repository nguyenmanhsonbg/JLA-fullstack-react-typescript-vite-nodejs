const express = require("express");
const {
	//getAllKanjiWord,
	getAllKanjiWordByKanjiId,
	getKanjiWordById,
	createNewKanjiWord,
	updateKanjiWordById,
	deleteKanjiWordById,
} = require("../controllers/kanji_word");
const router = express.Router();
const { checkAuthAndRole } = require("../middleware/auth");
router.get("/kanji_word", checkAuthAndRole([1, 2, 3, 4]), getAllKanjiWordByKanjiId);
router.get("/kanji_word/:kanji_word_id", checkAuthAndRole(1, 2, 3, 4), getKanjiWordById);
router.post("/kanji_word", checkAuthAndRole([1, 3]), createNewKanjiWord);
router.put("/kanji_word/:kanji_word_id", checkAuthAndRole([1, 3]), updateKanjiWordById);
router.patch("/kanji_word/kanji_word_id", checkAuthAndRole([1, 3]), deleteKanjiWordById);

module.exports = router;
