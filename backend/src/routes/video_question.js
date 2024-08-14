const express = require("express");
const {
	getAllVideoQuestionByVideoId,
	getVideoQuestionById,
	createNewVideoQuestion,
	updateVideoQuestionById,
	deleteVideoQuestionById,
} = require("../controllers/video_question");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/video_question", checkAuthAndRole([1, 2, 3, 4]), getAllVideoQuestionByVideoId);
router.get(
	"/video_question/:video_question_id",
	checkAuthAndRole([1, 2, 3, 4]),
	getVideoQuestionById,
);
router.post("/video_question", checkAuthAndRole([1, 3]), createNewVideoQuestion);
router.put(
	"/video_question/:video_question_id",
	checkAuthAndRole([1, 2, 3]),
	updateVideoQuestionById,
);
router.patch(
	"/video_question/:video_question_id",
	checkAuthAndRole([1, 2, 3]),
	deleteVideoQuestionById,
);

module.exports = router;
