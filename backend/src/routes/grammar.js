const express = require("express");
const {
	getGrammarById,
	getAllGrammarByDayId,
	createNewGrammar,
	updateGrammarById,
	deleteGrammarById,
	generateGrammarPracticeData
} = require("../controllers/grammar");
const grammarProgressController = require('../controllers/grammarProgress');
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/grammar", checkAuthAndRole([1, 2, 3, 4]), getAllGrammarByDayId);
router.get("/grammar/:grammar_id", checkAuthAndRole([1, 2, 3, 4]), getGrammarById);
router.post("/grammar", checkAuthAndRole([1, 3]), createNewGrammar);
router.post("/generate-grammar-practice-data", checkAuthAndRole([1, 2, 3, 4]), generateGrammarPracticeData);
router.put("/grammar/:grammar_id", checkAuthAndRole([1, 2, 3]), updateGrammarById);
router.patch("/grammar/:grammar_id", checkAuthAndRole([1, 2, 3]), deleteGrammarById);

//grammar progress
router.post('/update-grammar-learned',  checkAuthAndRole([1, 2, 3, 4]),grammarProgressController.updateGrammarProgress);
router.get('/user-grammars-learned/:accountId', checkAuthAndRole([1, 2, 3, 4]), grammarProgressController.getUserGrammarProgress);


module.exports = router;
