const { AccountWeek } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");
const {
	ACCOUNT_WEEK_GET_FAILED,
	ACCOUNT_WEEK_CREATED,
	ACCOUNT_WEEK_CREATED_FAILED,
	ACCOUNT_WEEK_UPDATED_FAILED,
	ACCOUNT_WEEK_UPDATED,
	ACCOUNT_WEEK_DELETED,
} = require("../messages/account_week");
async function getAllAccountWeek(req, res) {
	try {
		const account_week = await AccountWeek.findAll();
		return responseWithData(res, 200, account_week);
	} catch (error) {
		console.error("Error getting account-week:", error);
		throw error;
	}
}
async function getAllAccountWeekByAccountId(req, res) {
	try {
		const { account_id } = req.query;
		const account_week = await AccountWeek.findAll({ where: { account_id } });
		if (account_week) {
			return responseWithData(res, 200, account_week);
		} else {
			return badRequest(res, ACCOUNT_WEEK_GET_FAILED);
		}
	} catch (error) {
		console.error("Error getting all account-week by account id:", error);
		throw error;
	}
}
const createNewAccountWeek = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const account_week = await AccountWeek.create(req.body);
		if (account_week) {
			return created(res, ACCOUNT_WEEK_CREATED);
		} else {
			return badRequest(res, ACCOUNT_WEEK_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewAccountWeek", e);
		return error(res);
	}
};

module.exports = {
	getAllAccountWeek,
	getAllAccountWeekByAccountId,
	createNewAccountWeek,
};
