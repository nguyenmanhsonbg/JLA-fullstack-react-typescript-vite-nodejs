// nhắc nhóm nghĩ màn để quản lý các quiztypes bên content creator và admin

const { QuizType } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");

const {
	QUIZ_TYPE_GET_FAILED,
	QUIZ_TYPE_CREATED,
	QUIZ_TYPE_CREATED_FAILED,
	QUIZ_TYPE_UPDATED_FAILED,
	QUIZ_TYPE_DELETED,
	QUIZ_TYPE_UPDATED,
} = require("../messages/quiz_types");

async function getAllQuizTypes(req, res) {
	try {
		const quiz_types = await QuizType.findAll();
		return responseWithData(res, 200, quiz_types);
	} catch (error) {
		console.error("Error getting quiz types:", error);
		throw error;
	}
}

async function getQuizTypeById(req, res) {
	try {
		const { quiz_type_id } = req.params;
		const quiz_type = await QuizType.findAll({ where: { quiz_type_id } });
		if (quiz_type) {
			return responseWithData(res, 200, quiz_type);
		} else {
			return badRequest(res, QUIZ_TYPE_GET_FAILED);
		}
	} catch (er) {
		console.error("get QuizType By Id:", error);
		return error(res);
	}
}

async function createNewQuizType(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const quiz_type = await QuizType.create(req.body);
		if (quiz_type) {
			return created(res, QUIZ_TYPE_CREATED);
		} else {
			return badRequest(res, QUIZ_TYPE_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewQuizType", e);
		return error(res);
	}
}

async function updateQuizTypeById(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { quiz_type_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const quiz_types = await QuizType.findOne({
			where: {
				quiz_type_id,
			},
		});
		if (quiz_types) {
			const [updatedQuizType] = await QuizType.update(req.body, {
				where: { quiz_type_id },
			});
			if (updatedQuizType) {
				return ok(res, QUIZ_TYPE_UPDATED);
			} else {
				return badRequest(res, QUIZ_TYPE_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateQuizTypeById", e);
		return error(res);
	}
}

async function deleteQuizTypeById(req, res) {
	try {
		const { quiz_type_id } = req.params;
		const quiz_type = await QuizType.findOne({ where: { quiz_type_id } });
		if (!quiz_type) {
			return notfound(res);
		}
		quiz_type.quiz_type_status_id = 3;
		await quiz_type.save();
		return ok(res, QUIZ_TYPE_DELETED);
	} catch (err) {
		console.error("deleteQuizTypeById:", err);
		return error(res);
	}
}

module.exports = {
	getAllQuizTypes,
	createNewQuizType,
	getQuizTypeById,
	updateQuizTypeById,
	deleteQuizTypeById,
};
