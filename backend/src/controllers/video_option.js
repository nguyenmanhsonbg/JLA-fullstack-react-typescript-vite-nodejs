const { VideoOption } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");
const {
	VIDEO_OPTION_GET_FAILED,
	VIDEO_OPTION_CREATED,
	VIDEO_OPTION_CREATED_FAILED,
	VIDEO_OPTION_UPDATED,
	VIDEO_OPTION_UPDATED_FAILED,
	VIDEO_OPTION_DELETED,
} = require("../messages/video_option");

async function getAllVideoOptionByVideoQuestionId(req, res) {
	try {
		const { video_question_id } = req.query;
		const video_options = await VideoOption.findAll({ where: { video_question_id } });
		if (video_options) {
			return responseWithData(res, 200, video_options);
		} else {
			return badRequest(res, VIDEO_OPTION_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllVideoOptionByVideoQuestionId:", error);
		return error(res);
	}
}

async function createNewVideoOption(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const video_option = await VideoOption.create(req.body);
		if (video_option) {
			return responseWithData(res, 201, {
				data: video_option,
				message: VIDEO_OPTION_CREATED,
			});
		} else {
			return badRequest(res, VIDEO_OPTION_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewVideoOption", e);
		return error(res);
	}
}

async function updateVideoOptionById(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { video_option_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const video_option = await VideoOption.findOne({
			where: {
				video_option_id,
			},
		});
		if (video_option) {
			const [updatedVideoOption] = await Option.update(req.body, {
				where: { video_option_id },
			});
			if (updatedVideoOption) {
				return ok(res, VIDEO_OPTION_UPDATED);
			} else {
				return badRequest(res, VIDEO_OPTION_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateVideoOptionById", e);
		return error(res);
	}
}

async function deleteVideoOptionById(req, res) {
	try {
		const { video_option_id } = req.params;
		const video_option = await Question.findOne({ where: { video_option_id } });
		if (!video_option) {
			return notfound(res);
		}
		video_option.video_option_status_id = 3;
		await video_option.save();
		return ok(res, VIDEO_OPTION_DELETED);
	} catch (err) {
		console.error("deleteVideoOptionById:", err);
		return error(res);
	}
}

module.exports = {
	getAllVideoOptionByVideoQuestionId,
	createNewVideoOption,
	updateVideoOptionById,
	deleteVideoOptionById,
};
