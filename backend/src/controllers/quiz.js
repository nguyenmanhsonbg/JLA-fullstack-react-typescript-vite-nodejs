const { Quiz } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");
const {
	QUIZ_GET_FAILED,
	QUIZ_CREATED,
	QUIZ_CREATED_FAILED,
	QUIZ_UPDATED_FAILED,
	QUIZ_DELETED,
	QUIZ_UPDATED,
} = require("../messages/quiz");

async function getAllQuiz(req, res) {
	try {
		const quizzes = await Quiz.findAll();
		return responseWithData(res, 200, quizzes);
	} catch (error) {
		console.error("Error getting all quizzes:", error);
		throw error;
	}
}

async function getAllQuizByWeekId(req, res) {
	try {
		const { week_id } = req.query;
		const quizzes = await Quiz.findAll({ where: { week_id } });
		if (quizzes) {
			return responseWithData(res, 200, quizzes);
		} else {
			return badRequest(res, QUIZ_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllQuizByWeekId:", error);
		return error(res);
	}
}

async function getQuizById(req, res) {
	try {
		const { quiz_id } = req.params;
		const quizzes = await Quiz.findAll({ where: { quiz_id } });
		if (quizzes) {
			return responseWithData(res, 200, quizzes);
		} else {
			return badRequest(res, QUIZ_GET_FAILED);
		}
	} catch (er) {
		console.error("getQuizById:", error);
		return error(res);
	}
}

async function createNewQuiz(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const quiz = await Quiz.create(req.body);
		if (quiz) {
			return created(res, QUIZ_CREATED);
		} else {
			return badRequest(res, QUIZ_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewQuiz", e);
		return error(res);
	}
}

async function updateQuizById(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { quiz_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const quiz = await Quiz.findOne({
			where: {
				quiz_id,
			},
		});
		if (quiz) {
			const [updatedQuiz] = await Quiz.update(req.body, {
				where: { quiz_id },
			});
			if (updatedQuiz) {
				return ok(res, QUIZ_UPDATED);
			} else {
				return badRequest(res, QUIZ_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateQuizById", e);
		return error(res);
	}
}

async function deleteQuizById(req, res) {
	try {
		const { quiz_id } = req.params;
		const quiz = await Quiz.findOne({ where: { quiz_id } });
		if (!quiz) {
			return notfound(res);
		}
		quiz.quiz_status_id = 3;
		await quiz.save();
		return ok(res, QUIZ_DELETED);
	} catch (err) {
		console.error("deleteQuizById:", err);
		return error(res);
	}
}

module.exports = {
	getAllQuiz,
	getAllQuizByWeekId,
	getQuizById,
	createNewQuiz,
	updateQuizById,
	deleteQuizById,
};
