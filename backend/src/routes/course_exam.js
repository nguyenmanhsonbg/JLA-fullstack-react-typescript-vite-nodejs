const express = require('express');
const courseExamController  = require('../controllers/courseExam');
const { checkAuthAndRole } = require('../middleware/auth');
const router = express.Router();

router.post('/assign', checkAuthAndRole([1, 3]), courseExamController.assignExamToCourse);
router.delete('/courses/:courseId/exams/:examId', checkAuthAndRole([1, 3]), courseExamController.removeExamFromCourse);
router.get('/courses/:courseId/exams', checkAuthAndRole([1, 2, 3, 4]), courseExamController.getAllExamsByCourse);
router.get('/exams/:examId/courses', checkAuthAndRole([1, 2, 3, 4]), courseExamController.getAllCoursesByExam);
router.post('/get_exam_by_course_and_week', checkAuthAndRole([1, 2, 3, 4]), courseExamController.getExamByCourseAndWeek);

module.exports = router;
