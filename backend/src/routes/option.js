const express = require("express");
const {
	createNewOption,
	updateOptionById,
	deleteOptionById,
	getAllOptionByQuestionId,
} = require("../controllers/option");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/option", checkAuthAndRole([1, 2, 3, 4]), getAllOptionByQuestionId);
router.post("/option", checkAuthAndRole([1, 3]), createNewOption);
router.put("/option/:option_id", checkAuthAndRole([1, 2, 3]), updateOptionById);
router.patch("/option/:option_id", checkAuthAndRole([1, 2, 3]), deleteOptionById);

module.exports = router;
