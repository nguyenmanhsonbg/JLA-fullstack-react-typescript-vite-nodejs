const express = require("express");
const { getAllKanjiByDayId, getKanjiById, createNewKanji, updateKanjiById, deleteKanjiById, generateKanjiPracticeData } =
	require("../controllers").kanji;
const router = express.Router();
const { checkAuthAndRole } = require("../middleware/auth");
const kanjiProgressController = require('../controllers/kanjiProgress');

router.get("/kanji", checkAuthAndRole([1, 2, 3, 4]), getAllKanjiByDayId);
router.get("/kanji/:kanji_id", checkAuthAndRole([1, 2, 3, 4]), getKanjiById);
router.post("/kanji", checkAuthAndRole([1, 3]), createNewKanji);
router.put("/kanji/:kanji_id", checkAuthAndRole([1, 3]), updateKanjiById);
router.patch("/kanji/:kanji_id", checkAuthAndRole([1, 3]), deleteKanjiById);
router.post("/generate-kanji-practice-data", checkAuthAndRole([1, 2, 3, 4]), generateKanjiPracticeData);

router.post('/update',  checkAuthAndRole([1, 2, 3, 4]),kanjiProgressController.updateKanjiProgress);
router.get('/user-kanji-learned/:accountId',  checkAuthAndRole([1, 2, 3, 4]),kanjiProgressController.getUserKanjiProgress);
router.post('/update-all-kanji-learned',  checkAuthAndRole([1, 2, 3, 4]),kanjiProgressController.updateAllKanjiProgress); 

module.exports = router;
