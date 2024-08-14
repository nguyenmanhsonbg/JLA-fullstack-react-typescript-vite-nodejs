const { Question } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");
const {
	QUESTION_GET_FAILED,
	QUESTION_CREATED,
	QUESTION_CREATED_FAILED,
	QUESTION_UPDATED_FAILED,
	QUESTION_DELETED,
	QUESTION_UPDATED,
} = require("../messages/question");

async function getAllQuestion(req, res) {
	try {
		const questions = await Question.findAll();
		return responseWithData(res, 200, questions);
	} catch (error) {
		console.error("Error getting all questions:", error);
		throw error;
	}
}

async function getAllQuestionByQuizId(req, res) {
	try {
		const { quiz_id } = req.query;
		const questions = await Question.findAll({ where: { quiz_id } });
		if (questions) {
			return responseWithData(res, 200, questions);
		} else {
			return badRequest(res, QUESTION_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllQuestionByQuizId:", error);
		return error(res);
	}
}

async function getQuestionById(req, res) {
	try {
		const { question_id } = req.params;
		const questions = await Question.findAll({ where: { question_id } });
		if (questions) {
			return responseWithData(res, 200, questions);
		} else {
			return badRequest(res, QUESTION_GET_FAILED);
		}
	} catch (er) {
		console.error("getQuestionById:", error);
		return error(res);
	}
}

async function createNewQuestion(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const question = await Question.create(req.body);
		if (question) {
			return created(res, QUESTION_CREATED);
		} else {
			return badRequest(res, QUESTION_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewQUESTION", e);
		return error(res);
	}
}

async function updateQuestionById(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { question_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const question = await Question.findOne({
			where: {
				question_id,
			},
		});
		if (question) {
			const [updatedQuestion] = await Question.update(req.body, {
				where: { question_id },
			});
			if (updatedQuestion) {
				return ok(res, QUESTION_UPDATED);
			} else {
				return badRequest(res, QUESTION_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateQuestionById", e);
		return error(res);
	}
}

async function deleteQuestionById(req, res) {
	try {
		const { question_id } = req.params;
		const question = await Question.findOne({ where: { question_id } });
		if (!question) {
			return notfound(res);
		}
		question.question_status_id = 3;
		await question.save();
		return ok(res, QUESTION_DELETED);
	} catch (err) {
		console.error("deleteQuestionById:", err);
		return error(res);
	}
}

module.exports = {
	getAllQuestion,
	getAllQuestionByQuizId,
	getQuestionById,
	createNewQuestion,
	updateQuestionById,
	deleteQuestionById,
};
