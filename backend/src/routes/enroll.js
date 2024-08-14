const express = require("express");
const { checkAuthAndRole } = require("../middleware/auth");
const {
	getEnrollByAccountAndCourse,
	createNewEnroll,
	updateEnrollStatus,
} = require("../controllers/enroll");
const router = express.Router();

router.get("/enroll", checkAuthAndRole([1, 2, 3, 4]), getEnrollByAccountAndCourse);
router.post("/enroll", checkAuthAndRole([1, 2, 3, 4]), createNewEnroll);
router.patch("/enroll/:enroll_id", checkAuthAndRole([1, 2, 3, 4]), updateEnrollStatus);

module.exports = router;
