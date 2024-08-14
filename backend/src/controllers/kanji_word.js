const { KanjiWord } = require("../../models");
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
	KANJI_WORD_GET_FAILED,
	KANJI_WORD_CREATED,
	KANJI_WORD_CREATED_FAILED,
	KANJI_WORD_UPDATED_FAILED,
	KANJI_WORD_DELETED,
	KANJI_WORD_UPDATED,
} = require("../messages/KANJI_WORD");

async function getAllKanjiWord(req, res) {
	try {
		const kanji_words = await KanjiWord.findAll();
		return responseWithData(res, 200, kanji_words);
	} catch (error) {
		console.error("Error getting all kanji words:", error);
		throw error;
	}
}
async function getAllKanjiWordByKanjiId(req, res) {
	try {
		const { kanji_id } = req.query;
		const kanji_words = await KanjiWord.findAll({ where: { kanji_id } });
		if (kanji_words) {
			return responseWithData(res, 200, kanji_words);
		} else {
			return badRequest(res, KANJI_WORD_GET_FAILED);
		}
	} catch (error) {
		console.error("getAllKanjiWordbyKanjiId:", error);
		throw error;
	}
}

async function getKanjiWordById(req, res) {
	try {
		const { kanji_word_id } = req.params;
		const kanji = await Kanji.findAll({ where: { kanji_word_id } });
		if (kanji) {
			return responseWithData(res, 200, kanji);
		} else {
			return badRequest(res, KANJI_WORD_GET_FAILED);
		}
	} catch (er) {
		console.error("getKanjiWordById:", error);
		return error(res);
	}
}

const createNewKanjiWord = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const kanji_word = await KanjiWord.create(req.body);
		if (kanji_word) {
			return responseWithData(res, 201, {
				data: kanji_word,
				message: KANJI_WORD_CREATED,
			});
		} else {
			return badRequest(res, KANJI_WORD_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewKanjiWord", e);
		return error(e);
	}
};

const updateKanjiWordById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { kanji_word_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const kanji_word = await KanjiWord.findOne({
			where: {
				kanji_word_id,
			},
		});
		if (kanji_word) {
			const [updatedKanjiWord] = await KanjiWord.update(req.body, {
				where: { kanji_word_id },
			});
			if (updatedKanjiWord) {
				return ok(res, KANJI_WORD_UPDATED);
			} else {
				return badRequest(res, KANJI_WORD_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateKanjiWordById", e);
		return error(e);
	}
};

async function deleteKanjiWordById(req, res) {
	try {
		const { kanji_word_id } = req.params;
		const kanji_word = await KanjiWord.findOne({ where: { kanji_word_id } });
		if (!kanji_word) {
			return notfound(res);
		}
		kanji_word.kanji_word_status_id = 3;
		await kanji_word.save();
		return ok(res, KANJI_WORD_DELETED);
	} catch (err) {
		console.error("deleteKanjiWordById:", err);
		return error(res);
	}
}

module.exports = {
	getAllKanjiWord,
	getAllKanjiWordByKanjiId,
	getKanjiWordById,
	createNewKanjiWord,
	updateKanjiWordById,
	deleteKanjiWordById,
};
