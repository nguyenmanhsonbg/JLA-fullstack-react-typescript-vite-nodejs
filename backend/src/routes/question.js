const express = require("express");
const {
	getQuestionById,
	createNewQuestion,
	updateQuestionById,
	deleteQuestionById,
	getAllQuestionByQuizId,
} = require("../controllers/question");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/question", checkAuthAndRole([1, 2, 3, 4]), getAllQuestionByQuizId);
router.get("/question/:question_id", checkAuthAndRole([1, 2, 3, 4]), getQuestionById);
router.post("/question", checkAuthAndRole([1, 3]), createNewQuestion);
router.put("/question/:question_id", checkAuthAndRole([1, 2, 3]), updateQuestionById);
router.patch("/question/:question_id", checkAuthAndRole([1, 2, 3]), deleteQuestionById);

module.exports = router;
