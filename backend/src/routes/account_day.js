const express = require("express");
const {
	getAllAccountDay,
	getAllAccountDayByAccountId,
	createNewAccountDay,
} = require("../controllers/account_day");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/account_day", checkAuthAndRole([1, 2, 3, 4]), getAllAccountDayByAccountId);
router.post("/account_day", checkAuthAndRole([1, 2, 3, 4]), createNewAccountDay);
// router.put("/account_day/:account_day_id", checkAuthAndRole([1, 2, 3]), updateAccounDayById);
// router.patch("/account_day/:account_day_id", checkAuthAndRole([1, 2, 3]), deleteAccountDayById);

module.exports = router;
