const { Day } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	forbidden,
	notfound,
	created,
	ok,
} = require("../handlers/response_handler");
const {
	DAY_GET_FAILED,
	DAY_CREATED_FAILED,
	DAY_CREATED,
	DAY_UPDATED,
	DAY_UPDATED_FAILED,
	DAY_DELETED,
} = require("../messages/day");

async function getAllDayByWeekId(req, res) {
	try {
		const { week_id } = req.query;
		const days = await Day.findAll({ where: { week_id } });
		if (days) {
			return responseWithData(res, 200, days);
		} else {
			return badRequest(res, DAY_GET_FAILED);
		}
	} catch (error) {
		console.error("Error getting all days:", error);
		throw error;
	}
}

const createNewDay = async (req, res) => {
	try {
		const { accountId } = req;
		const { day_name, day_status_id, week_id, repeat_lesson, account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const formattedRepeatLesson = typeof repeat_lesson === "object" ? JSON.stringify(repeat_lesson) : repeat_lesson;

		    const newDay = await Day.create({
     		day_name,
    		day_status_id,
     		week_id,
      		repeat_lesson: formattedRepeatLesson,
   			 });
		if (newDay) {
			return responseWithData(res, 201, { data: newDay, message: DAY_CREATED });
		} else {
			return badRequest(res, DAY_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewDay", e);
		return error(res);
	}
};

const updateDayById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id, day_status_id, day_name, week_id, day_image, day_deadline } = req.body;
		const { day_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const day = await Day.findOne({
			where: {
				day_id,
			},
		});
		if (day) {
			day.day_status_id = day_status_id;
			day.day_name = day_name || day.day_name;
			day.week_id = week_id || day.week_id;
			day.day_image = day_image || day.day_image;
			day_deadline.day_deadline = day_deadline || day.day_deadline;

			const update = day.save();
			if (update) {
				return ok(res, DAY_UPDATED);
			} else {
				return badRequest(res, DAY_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateDayById", e);
		return error(res);
	}
};

async function deleteDayById(req, res) {
	try {
		const { day_id } = req.params;
		const day = await Day.findOne({ where: { day_id } });
		if (!day) {
			return notfound(res);
		}
		day.day_status_id = 3;
		await day.save();
		return ok(res, DAY_DELETED);
	} catch (err) {
		console.error("deleteDayById:", err);
		return error(res);
	}
}

module.exports = {
	getAllDayByWeekId,
	createNewDay,
	updateDayById,
	deleteDayById,
};
