const express = require("express");
const {
	getLessonById,
	createNewLesson,
	updateLessonById,
	deleteLessonById,
	getAllLessonByDayId,
} = require("../controllers/lesson");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/lesson", checkAuthAndRole([1, 2, 3, 4]), getAllLessonByDayId);
router.get("/lesson/:lesson_id", checkAuthAndRole([1, 2, 3, 4]), getLessonById);
router.post("/lesson", checkAuthAndRole([1, 3]), createNewLesson);
router.put("/lesson/:lesson_id", checkAuthAndRole([1, 2, 3]), updateLessonById);
router.patch("/lesson/:lesson_id", checkAuthAndRole([1, 2, 3]), deleteLessonById);

module.exports = router;
