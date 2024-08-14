const { AccountDay } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");
const {
	ACCOUNT_DAY_GET_FAILED,
	ACCOUNT_DAY_CREATED,
	ACCOUNT_DAY_CREATED_FAILED,
	ACCOUNT_DAY_UPDATED_FAILED,
	ACCOUNT_DAY_UPDATED,
	ACCOUNT_DAY_DELETED,
} = require("../messages/account_day");
async function getAllAccountDay(req, res) {
	try {
		const account_day = await AccountDay.findAll();
		return responseWithData(res, 200, account_day);
	} catch (error) {
		console.error("Error getting account-day:", error);
		throw error;
	}
}
async function getAllAccountDayByAccountId(req, res) {
	try {
		const { account_id } = req.query;
		const account_day = await AccountDay.findAll({ where: { account_id } });
		if (account_day) {
			return responseWithData(res, 200, account_day);
		} else {
			return badRequest(res, ACCOUNT_DAY_GET_FAILED);
		}
	} catch (error) {
		console.error("Error getting all account-day by account id:", error);
		throw error;
	}
}
const createNewAccountDay = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const account_day = await AccountDay.create(req.body);
		if (account_day) {
			return created(res, ACCOUNT_DAY_CREATED);
		} else {
			return badRequest(res, ACCOUNT_DAY_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewAccountDay", e);
		return error(res);
	}
};
module.exports = {
	getAllAccountDay,
	getAllAccountDayByAccountId,
	createNewAccountDay,
};
