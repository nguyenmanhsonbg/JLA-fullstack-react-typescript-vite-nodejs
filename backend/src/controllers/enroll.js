const {
	error,
	forbidden,
	responseWithData,
	notfound,
	created,
	badRequest,
	ok,
} = require("../handlers/response_handler");
const { Enroll, Course, Account } = require("../../models");
const {
	ENROLL_CREATED,
	ENROLL_EXISTING,
	ENROLL_UPDATED,
	ENROLL_FAILED,
	ENROLL_UPDATED_FAILED,
} = require("../messages/enroll");
const { Op } = require("sequelize");

const getEnrollByAccountAndCourse = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id, course_id } = req.query;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const enroll = await Enroll.findOne({
			where: {
				account_id,
				course_id,
			},
		});
		if (enroll) {
			return responseWithData(res, 200, enroll);
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("getEnrollByAccountAndCourse", e);
		return error(res);
	}
};

const createNewEnroll = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id, course_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const [course, account, checkEnroll] = await Promise.all([
			Course.findByPk(course_id),
			Account.findByPk(account_id),
			Enroll.findOne({
				where: {
					[Op.and]: [{ account_id }, { course_id }],
				},
			}),
		]);
		if (!course || !account) {
			return notfound(res);
		}

		if (checkEnroll) {
			return badRequest(res, ENROLL_EXISTING);
		}

		const enroll = await Enroll.create(req.body);
		if (enroll) {
			return created(res, ENROLL_CREATED);
		} else {
			return badRequest(res, ENROLL_FAILED);
		}
	} catch (e) {
		console.log("createNewEnroll", e);
		return error(res);
	}
};

const updateEnrollStatus = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id, enroll_status_id } = req.body;
		const { enroll_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const enroll = await Enroll.findOne({
			where: {
				enroll_id,
			},
		});
		if (enroll) {
			enroll.enroll_status_id = enroll_status_id;
			const update = enroll.save();
			if (update) {
				return ok(res, ENROLL_UPDATED);
			} else {
				return badRequest(res, ENROLL_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateEnrollStatus", e);
		return error(res);
	}
};

module.exports = { getEnrollByAccountAndCourse, createNewEnroll, updateEnrollStatus };
