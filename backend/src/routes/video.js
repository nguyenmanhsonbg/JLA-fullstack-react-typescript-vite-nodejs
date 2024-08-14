const express = require("express");
const {
	getAllVideo,
	getVideoById,
	getAllVideoByDayId,
	createNewVideo,
	updateVideoById,
	deleteVideoById,
} = require("../controllers/video");
const videoProgressController = require('../controllers/videoProgress');
const router = express.Router();
const { checkAuthAndRole } = require("../middleware/auth");

router.get("/all_video", getAllVideo);
router.get("/video", checkAuthAndRole([1, 2, 3, 4]), getAllVideoByDayId);
router.get("/video/:video_id", checkAuthAndRole([1, 2, 3, 4]), getVideoById);
router.post("/video", checkAuthAndRole([1, 3]), createNewVideo);
router.put("/video/:video_id", checkAuthAndRole([1, 2, 3]), updateVideoById);
router.patch("/video/:video_id", checkAuthAndRole([1, 2, 3]), deleteVideoById);

router.post('/update-video-learned', videoProgressController.updateVideoProgress);
router.get('/user-videos-learned/:accountId', videoProgressController.getUserVideoProgress);

module.exports = router;
