const express = require('express');
const examController = require('../controllers/exam');
const { checkAuthAndRole } = require('../middleware/auth');
const router = express.Router();

router.post('/exams', checkAuthAndRole([1, 3]), examController.createExam);
router.get('/getAllExam', checkAuthAndRole([1, 2, 3, 4]), examController.getAllExams);
router.get('/get-exam-without-answers/:weekly_exam_id', checkAuthAndRole([1, 2, 3, 4]), examController.getExamWithoutAnswerById);
router.put('/exams/:examId', checkAuthAndRole([1, 2, 3]), examController.updateExam);
router.delete('/exams/:examId', checkAuthAndRole([1, 2, 3]), examController.deleteExam);
router.post('/exams/:examId/courses/:courseId', checkAuthAndRole([1, 3]), examController.assignExamToCourse);
router.delete('/exams/:examId/courses/:courseId', checkAuthAndRole([1, 3]), examController.removeExamFromCourse);

module.exports = router;