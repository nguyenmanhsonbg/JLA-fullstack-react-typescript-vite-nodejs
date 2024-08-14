const express = require("express");
const {
	getAllWeek,
	getAllWeekByCourseId,
	createNewWeek,
	updateWeekById,
	deleteWeekById,
} = require("../controllers/week");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/all_week", checkAuthAndRole([1, 2, 3, 4]), getAllWeek);
router.get("/week", checkAuthAndRole([1, 2, 3, 4]), getAllWeekByCourseId);
router.post("/week", checkAuthAndRole([1, 3]), createNewWeek);
router.put("/week/:week_id", checkAuthAndRole([1, 2, 3]), updateWeekById);
router.patch("/week/:week_id", checkAuthAndRole([1, 2, 3]), deleteWeekById);

module.exports = router;
