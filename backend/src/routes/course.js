const express = require("express");
const {
	getAllCourse,
	getCourseById,
	createNewCourse,
	updateCourseById,
	deleteCourseById,
	getCourseDetailById,
	updateCourseDetail,
	getAllCourseExtend,
	getProgressByDayId,
	getProgressByWeekId
} = require("../controllers/course");
const courseEnrollmentController = require("../controllers/courseEnrollmentController");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();


// 1 - Admin
// 2 - Content Manager
// 3 - Content Creator

router.get("/all_course", checkAuthAndRole([1, 2, 3, 4]), getAllCourse);
router.post("/all_course_extend", checkAuthAndRole([1, 2, 3, 4]), getAllCourseExtend);
router.post("/get_detail_course_progress_by_day", checkAuthAndRole([1, 2, 3, 4]), getProgressByDayId);
router.post("/get_detail_course_progress_by_week", checkAuthAndRole([1, 2, 3, 4]), getProgressByWeekId);
router.get("/course/:course_id", checkAuthAndRole([1, 2, 3, 4]), getCourseById);
router.post("/course", checkAuthAndRole([3]), createNewCourse);
router.put("/course/:course_id", checkAuthAndRole([2,3]), updateCourseById);
router.patch("/course/:course_id", checkAuthAndRole([1, 2, 3]), deleteCourseById);
router.get("/course-detail/:course_id", checkAuthAndRole([1, 2, 3, 4]), getCourseDetailById);
router.put("/course-detail", checkAuthAndRole([1, 2, 3]), updateCourseDetail);

//course enroll
router.post('/enroll', checkAuthAndRole([1, 2, 3, 4]),courseEnrollmentController.enroll);
router.post('/account-enroll', checkAuthAndRole([1, 2, 3, 4]), courseEnrollmentController.checkEnrollment);

module.exports = router;
	