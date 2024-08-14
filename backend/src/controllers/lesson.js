const { Lesson } = require("../../models");
const { responseWithData, badRequest, error, created, ok, notfound } = require("../handlers/response_handler");
const {
	LESSON_GET_FAILED,
	LESSON_CREATED,
	LESSON_CREATED_FAILED,
	LESSON_UPDATED_FAILED,
	LESSON_DELETED,
	LESSON_UPDATED,
} = require("../messages/lesson");

async function getAllLessonByDayId(req, res) {
	try {
		const { day_id } = req.query;
		const lessons = await Lesson.findAll({ where: { day_id } });
		if (lessons) {
			return responseWithData(res, 200, lessons);
		} else {
			return badRequest(res, LESSON_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllLessonByDayId:", error);
		return error(res);
	}
}

async function getLessonById(req, res) {
	try {
		const { lesson_id } = req.params;
		const lessons = await Lesson.findAll({ where: { lesson_id } });
		if (lessons) {
			return responseWithData(res, 200, lessons);
		} else {
			return badRequest(res, LESSON_GET_FAILED);
		}
	} catch (er) {
		console.error("getLessonById:", error);
		return error(res);
	}
}

const createNewLesson = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const lesson = await Lesson.create(req.body);
		if (lesson) {
			return created(res, LESSON_CREATED);
		} else {
			return badRequest(res, LESSON_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewLesson", e);
		return error(res);
	}
};

const updateLessonById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { lesson_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const lesson = await Lesson.findOne({
			where: {
				lesson_id,
			},
		});
		if (lesson) {
			const [updatedLesson] = await Lesson.update(req.body, {
				where: { lesson_id },
			});
			if (updatedLesson) {
				return ok(res, LESSON_UPDATED);
			} else {
				return badRequest(res, LESSON_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateLessonById", e);
		return error(res);
	}
};

async function deleteLessonById(req, res) {
	try {
		const { lesson_id } = req.params;
		const lesson = await Lesson.findOne({ where: { lesson_id } });
		if (!lesson) {
			return notfound(res);
		}
		lesson.lesson_status_id = 3;
		await lesson.save();
		return ok(res, LESSON_DELETED);
	} catch (err) {
		console.error("deleteLessonById:", err);
		return error(res);
	}
}

// async function

module.exports = {
	getAllLessonByDayId,
	getLessonById,
	createNewLesson,
	updateLessonById,
	deleteLessonById,
};
