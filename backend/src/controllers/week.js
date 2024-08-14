const { Week } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	forbidden,
	created,
	ok,
} = require("../handlers/response_handler");
const {
	WEEK_GET_FAILED,
	WEEK_CREATED_FAILED,
	WEEK_CREATED,
	WEEK_UPDATED,
	WEEK_UPDATED_FAILED,
	WEEK_DELETED,
} = require("../messages/week");

async function getAllWeek(req, res) {
	try {
		const weeks = await Week.findAll();
		return responseWithData(res, 200, weeks);
	} catch (error) {
		console.error("Error getting weeks:", error);
		throw error;
	}
}

async function getAllWeekByCourseId(req, res) {
	try {
		const { course_id } = req.params;
		const weeks = await Day.findAll({ where: { course_id } });
		if (weeks) {
			return responseWithData(res, 200, weeks);
		} else {
			return badRequest(res, WEEK_GET_FAILED);
		}
	} catch (error) {
		console.error("Error getting all weeks:", error);
		throw error;
	}
}

const createNewWeek = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const week = await Week.create(req.body);
		if (week) {
			return responseWithData(res, 201, { data: week, message: WEEK_CREATED });
		} else {
			return badRequest(res, WEEK_CREATED_FAILED);
		}
	} catch (e) {
		console.log("create New Week", e);
		return error(res);
	}
};

async function updateWeekById(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { week_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const week = await Week.findOne({
			where: {
				week_id,
			},
		});
		if (week) {
			const [updatedWeek] = await Week.update(req.body, {
				where: { week_id },
			});
			if (updatedWeek) {
				return ok(res, WEEK_UPDATED);
			} else {
				return badRequest(res, WEEK_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateWeekById", e);
		return error(res);
	}
}

async function deleteWeekById(req, res) {
	try {
		const { week_id } = req.params;
		const week = await Week.findOne({ where: { week_id } });
		if (!week) {
			return notfound(res);
		}
		week.week_status_id = 3;
		await week.save();
		return ok(res, WEEK_DELETED);
	} catch (err) {
		console.error("deleteWeekById:", err);
		return error(res);
	}
}

module.exports = {
	getAllWeek,
	getAllWeekByCourseId,
	createNewWeek,
	updateWeekById,
	deleteWeekById,
};
