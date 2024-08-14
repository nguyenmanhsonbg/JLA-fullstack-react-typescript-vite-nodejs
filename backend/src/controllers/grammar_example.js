const { GrammarExample } = require("../../models");
const {
	error,
	forbidden,
	responseWithData,
	notfound,
	created,
	badRequest,
	ok,
} = require("../handlers/response_handler");
const {
	GRAMMAR_EXAMPLE_GET_FAILED,
	GRAMMAR_EXAMPLE_CREATED,
	GRAMMAR_EXAMPLE_CREATED_FAILED,
	GRAMMAR_EXAMPLE_UPDATED_FAILED,
	GRAMMAR_EXAMPLE_DELETED,
	GRAMMAR_EXAMPLE_UPDATED,
} = require("../messages/grammar_example");

async function getAllGrammarExampleByGrammarId(req, res) {
	try {
		const { grammar_id } = req.query;
		const grammars = await GrammarExample.findAll({ where: { grammar_id } });
		if (grammars) {
			return responseWithData(res, 200, grammars);
		} else {
			return badRequest(res, GRAMMAR_EXAMPLE_GET_FAILED);
		}
	} catch (error) {
		console.error("getAllGrammarByGrammarId:", error);
		throw error;
	}
}

async function getGrammarExampleById(req, res) {
	try {
		const { grammar_example_id } = req.params;
		const grammars = await GrammarExample.findAll({ where: { grammar_example_id } });
		if (grammars) {
			return responseWithData(res, 200, grammars);
		} else {
			return badRequest(res, GRAMMAR_EXAMPLE_GET_FAILED);
		}
	} catch (error) {
		console.error("getGrammarById:", error);
		throw error;
	}
}

const createNewGrammarExample = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const grammar = await GrammarExample.create(req.body);
		if (grammar) {
			return responseWithData(res, 201, {
				data: grammar,
				message: GRAMMAR_EXAMPLE_CREATED,
			});
		} else {
			return badRequest(res, GRAMMAR_EXAMPLE_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewGrammarExample", e);
		return error(e);
	}
};

const updateGrammarExampleById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { grammar_example_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const grammar = await GrammarExample.findOne({
			where: {
				grammar_example_id,
			},
		});
		if (grammar) {
			const [updatedGrammar] = await GrammarExample.update(req.body, {
				where: { grammar_example_id },
			});
			if (updatedGrammar) {
				return ok(res, GRAMMAR_EXAMPLE_UPDATED);
			} else {
				return badRequest(res, GRAMMAR_EXAMPLE_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateGrammarExampleById", e);
		return error(e);
	}
};

async function deleteGrammarExampleById(req, res) {
	try {
		const { grammar_example_id } = req.params;
		const grammar = await GrammarExample.findOne({ where: { grammar_example_id } });
		if (!grammar) {
			return notfound(res);
		}
		grammar.grammar_example_status_id = 3;
		await grammar.save();
		return ok(res, GRAMMAR_EXAMPLE_DELETED);
	} catch (err) {
		console.error("deleteGrammarExampleById:", err);
		return error(res);
	}
}

// async function

module.exports = {
	getAllGrammarExampleByGrammarId,
	getGrammarExampleById,
	createNewGrammarExample,
	updateGrammarExampleById,
	deleteGrammarExampleById,
};
