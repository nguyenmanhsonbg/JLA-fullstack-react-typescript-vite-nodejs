const { Video } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");

const {
	VIDEO_GET_FAILED,
	VIDEO_CREATED,
	VIDEO_CREATED_FAILED,
	VIDEO_UPDATED_FAILED,
	VIDEO_UPDATED,
	VIDEO_DELETED,
} = require("../messages/video");

async function getAllVideo(req, res) {
	try {
		const videos = await Video.findAll();
		return responseWithData(res, 200, vocabs);
	} catch (error) {
		console.error("Error getting all video:", error);
		throw error;
	}
}

async function getVideoById(req, res) {
	try {
		const { video_id } = req.query;
		const videos = await Video.findAll({ where: { video_id } });
		if (videos) {
			return responseWithData(res, 200, videos);
		} else {
			return badRequest(res, VIDEO_GET_FAILED);
		}
	} catch (er) {
		console.error("getVideoById:", error);
		return error(res);
	}
}

async function getAllVideoByDayId(req, res) {
	try {
		const { day_id } = req.query;
		const videos = await Video.findAll({ where: { day_id } });
		if (videos) {
			return responseWithData(res, 200, videos);
		} else {
			return badRequest(res, VIDEO_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllVideoByDayId:", error);
		return error(res);
	}
}

async function createNewVideo(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const video = await Video.create(req.body);
		if (video) {
			return responseWithData(res, 201, { data: video, message: VIDEO_CREATED });
		} else {
			return badRequest(res, VIDEO_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewVideo", e);
		return error(res);
	}
}

async function updateVideoById(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { video_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const video = await Video.findOne({
			where: {
				video_id,
			},
		});
		if (video) {
			const [updatedVideo] = await Video.update(req.body, {
				where: { video_id },
			});
			if (updatedVideo) {
				return ok(res, VIDEO_UPDATED);
			} else {
				return badRequest(res, VIDEO_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateVideoById", e);
		return error(res);
	}
}

async function deleteVideoById(req, res) {
	try {
		const { video_id } = req.params;
		const video = await Video.findOne({ where: { video_id } });
		if (!video) {
			return notfound(res);
		}
		video.video_status_id = 3;
		await video.save();
		return ok(res, VIDEO_DELETED);
	} catch (err) {
		console.error("deleteVideoById:", err);
		return error(res);
	}
}

module.exports = {
	getAllVideo,
	getVideoById,
	createNewVideo,
	getAllVideoByDayId,
	updateVideoById,
	deleteVideoById,
};
