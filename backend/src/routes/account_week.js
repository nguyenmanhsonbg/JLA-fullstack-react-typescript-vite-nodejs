const express = require("express");
const {
	getAllAccountWeek,
	getAllAccountWeekByAccountId,
	createNewAccountWeek,
} = require("../controllers/account_week");
const { checkAuthAndRole } = require("../middleware/auth");

const router = express.Router();

router.get("/account_week", checkAuthAndRole([1, 2, 3, 4]), getAllAccountWeekByAccountId);
router.post("/account_week", checkAuthAndRole([1, 2, 3, 4]), createNewAccountWeek);
// router.put("/account_week/:account_week_id", checkAuthAndRole([1, 2, 3]), updateAccounWeekById);
// router.patch("/account_week/:account_week_id", checkAuthAndRole([1, 2, 3]), deleteAccountWeekById);

module.exports = router;
