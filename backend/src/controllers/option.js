const { Option } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");
const {
	OPTION_GET_FAILED,
	OPTION_CREATED,
	OPTION_CREATED_FAILED,
	OPTION_UPDATED_FAILED,
	OPTION_DELETED,
	OPTION_UPDATED,
} = require("../messages/option");

async function getAllOptionByQuestionId(req, res) {
	try {
		const { question_id } = req.query;
		const options = await Option.findAll({ where: { question_id } });
		if (options) {
			return responseWithData(res, 200, options);
		} else {
			return badRequest(res, OPTION_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllOptionByQuestionId:", error);
		return error(res);
	}
}

async function createNewOption(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const option = await Option.create(req.body);
		if (option) {
			return created(res, OPTION_CREATED);
		} else {
			return badRequest(res, OPTION_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewOption", e);
		return error(res);
	}
}

async function updateOptionById(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { option_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const option = await Option.findOne({
			where: {
				option_id,
			},
		});
		if (option) {
			const [updatedOption] = await Option.update(req.body, {
				where: { option_id },
			});
			if (updatedOption) {
				return ok(res, OPTION_UPDATED);
			} else {
				return badRequest(res, OPTION_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateOptionById", e);
		return error(res);
	}
}

async function deleteOptionById(req, res) {
	try {
		const { option_id } = req.params;
		const option = await Question.findOne({ where: { option_id } });
		if (!option) {
			return notfound(res);
		}
		option.option_status_id = 3;
		await option.save();
		return ok(res, OPTION_DELETED);
	} catch (err) {
		console.error("deleteOptionById:", err);
		return error(res);
	}
}

module.exports = {
	getAllOptionByQuestionId,
	createNewOption,
	updateOptionById,
	deleteOptionById,
};
