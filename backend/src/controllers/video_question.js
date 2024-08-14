const { VideoQuestion } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");
const {
	VIDEO_QUESTION_GET_FAILED,
	VIDEO_QUESTION_CREATED,
	VIDEO_QUESTION_CREATED_FAILED,
	VIDEO_QUESTION_UPDATED_FAILED,
	VIDEO_QUESTION_DELETED,
	VIDEO_QUESTION_UPDATED,
} = require("../messages/video_question");

async function getAllVideoQuestionByVideoId(req, res) {
	try {
		const { video_id } = req.query;
		const video_questions = await Question.findAll({ where: { video_id } });
		if (video_questions) {
			return responseWithData(res, 200, video_questions);
		} else {
			return badRequest(res, VIDEO_QUESTION_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllvIDEOQuestionByVideoId:", error);
		return error(res);
	}
}

async function getVideoQuestionById(req, res) {
	try {
		const { video_question_id } = req.params;
		const video_questions = await VideoQuestion.findAll({ where: { video_question_id } });
		if (video_questions) {
			return responseWithData(res, 200, video_questions);
		} else {
			return badRequest(res, VIDEO_QUESTION_GET_FAILED);
		}
	} catch (er) {
		console.error("getVideoQuestionById:", error);
		return error(res);
	}
}

async function createNewVideoQuestion(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const video_question = await VideoQuestion.create(req.body);
		if (video_question) {
			return responseWithData(res, 201, {
				data: video_question,
				message: VIDEO_QUESTION_CREATED,
			});
		} else {
			return badRequest(res, VIDEO_QUESTION_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewVideoQuestion", e);
		return error(res);
	}
}

async function updateVideoQuestionById(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { question_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const video_question = await VideoQuestion.findOne({
			where: {
				video_question_id,
			},
		});
		if (video_question) {
			const [updatedVideoQuestion] = await VideoQuestion.update(req.body, {
				where: { video_question_id },
			});
			if (updatedVideoQuestion) {
				return ok(res, VIDEO_QUESTION_UPDATED);
			} else {
				return badRequest(res, VIDEO_QUESTION_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateVideoQuestionById", e);
		return error(res);
	}
}

async function deleteVideoQuestionById(req, res) {
	try {
		const { video_question_id } = req.params;
		const video_question = await VideoQuestion.findOne({ where: { video_question_id } });
		if (!video_question) {
			return notfound(res);
		}
		video_question.video_question_status_id = 3;
		await video_question.save();
		return ok(res, VIDEO_QUESTION_DELETED);
	} catch (err) {
		console.error("deleteVideoQuestionById:", err);
		return error(res);
	}
}

module.exports = {
	// getAllVideoQuestion,
	getAllVideoQuestionByVideoId,
	getVideoQuestionById,
	createNewVideoQuestion,
	updateVideoQuestionById,
	deleteVideoQuestionById,
};
