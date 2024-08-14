const { Vocabulary } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");

const {
	VOCABULARY_GET_FAILED,
	VOCABULARY_CREATED,
	VOCABULARY_CREATED_FAILED,
	VOCABULARY_UPDATED_FAILED,
	VOCABULARY_UPDATED,
	VOCABULARY_DELETED,
} = require("../messages/vocabulary");

async function getAllVocab(req, res) {
	try {
		const vocabs = await Vocabulary.findAll();
		return responseWithData(res, 200, vocabs);
	} catch (error) {
		console.error("Error getting all vocabulary:", error);
		throw error;
	}
}

async function createNewVocab(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const vocabs = await Vocabulary.create(req.body);
		if (vocabs) {
			return created(res, VOCABULARY_CREATED);
		} else {
			return badRequest(res, VOCABULARY_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewVocabulary", e);
		return error(res);
	}
}

module.exports = {
	getAllVocab,
	createNewVocab,
};
