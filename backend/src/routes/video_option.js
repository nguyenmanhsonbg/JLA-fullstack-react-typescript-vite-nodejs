const express = require("express");
const {
	getAllVideoOptionByVideoQuestionId,
	createNewVideoOption,
	updateVideoOptionById,
	deleteVideoOptionById,
} = require("../controllers/video_option");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/video_option", checkAuthAndRole([1, 2, 3, 4]), getAllVideoOptionByVideoQuestionId);
router.post("/video_option", checkAuthAndRole([1, 3]), createNewVideoOption);
router.put("/video_option/:video_option_id", checkAuthAndRole([1, 2, 3]), updateVideoOptionById);
router.patch("/video_option/:video_option_id", checkAuthAndRole([1, 2, 3]), deleteVideoOptionById);

module.exports = router;
