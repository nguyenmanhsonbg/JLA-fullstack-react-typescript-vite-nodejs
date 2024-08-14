const express = require("express");
const {
	getAllVocab,
	getVocabById,
	getAllVocabByDayId,
	createNewVocab,
	updateVocabById,
	deleteVocabById,
	generatePracticeData
} = require("../controllers/vocabulary");
const vocabularyProgressController = require('../controllers/vocabularyProgress');
const router = express.Router();
const { checkAuthAndRole } = require("../middleware/auth");

router.get("/all_vocabulary", checkAuthAndRole([1, 2, 3, 4]), getAllVocab);
router.get("/vocabulary", checkAuthAndRole([1, 2, 3, 4]), getAllVocabByDayId);
router.get("/vocabulary/:vocab_id", checkAuthAndRole([1, 2, 3, 4]), getVocabById);
router.post("/vocabulary", checkAuthAndRole([1, 3]), createNewVocab);
router.post("/generate-vocabulary-practice-data", checkAuthAndRole([1, 2, 3, 4]), generatePracticeData);
router.put("/vocabulary/:vocab_id", checkAuthAndRole([1, 2, 3]), updateVocabById);
router.patch("/vocabulary/:vocab_id", checkAuthAndRole([1, 2, 3]), deleteVocabById);

router.post('/update',  checkAuthAndRole([1, 2, 3, 4]),vocabularyProgressController.updateVocabularyProgress);
router.get('/user-vocabulary-learned/:accountId',  checkAuthAndRole([1, 2, 3, 4]),vocabularyProgressController.getUserVocabularyProgress);
router.post('/update-all-vocabulary-learned',  checkAuthAndRole([1, 2, 3, 4]),vocabularyProgressController.updateAllVocabularyProgress); 

module.exports = router;
