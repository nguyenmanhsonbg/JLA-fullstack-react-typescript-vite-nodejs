const express = require("express");
const {
	getAllDayByWeekId,
	createNewDay,
	updateDayById,
	deleteDayById,
} = require("../controllers/day");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/day", checkAuthAndRole([1, 2, 3, 4]), getAllDayByWeekId);
router.post("/day", checkAuthAndRole([1, 3]), createNewDay);
router.put("/day/:day_id", checkAuthAndRole([1, 2, 3]), updateDayById);
router.patch("/day/:day_id", checkAuthAndRole([1, 2, 3]), deleteDayById);

module.exports = router;
