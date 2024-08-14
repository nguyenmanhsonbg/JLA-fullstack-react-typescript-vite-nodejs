const { Alphabet } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");
const {
	ALPHABET_GET_FAILED,
	ALPHABET_CREATED,
	ALPHABET_CREATED_FAILED,
	ALPHABET_UPDATED_FAILED,
	ALPHABET_DELETED,
	ALPHABET_UPDATED,
} = require("../messages/alphabet");
const { Op } = require("sequelize");
async function getAllAlphabet(req, res) {
	try {
		const alphabets = await Alphabet.findAll();
		return responseWithData(res, 200, alphabets);
	} catch (error) {
		console.error("Error getting all alphabet:", error);
		throw error;
	}
}

async function getAllAlphabetByTypeId(req, res) {
	try {
		const { type_id } = req.query;
		const alphabets = await Alphabet.findAll({ where: { type_id } });
		if (alphabets) {
			return responseWithData(res, 200, alphabets);
		} else {
			return badRequest(res, ALPHABET_GET_FAILED);
		}
	} catch (error) {
		console.error("Error getting all alphabets by type id:", error);
		throw error;
	}
}
async function getAllHigaAlphabet(req, res) {
	try {
		const alphabets = await Alphabet.findAll({
			where: { [Op.or]: [{ type_id: 1 }, { type_id: 3 }, { type_id: 5 }] },
		});
		if (alphabets) {
			return responseWithData(res, 200, alphabets);
		} else {
			return badRequest(res, ALPHABET_GET_FAILED);
		}
	} catch (error) {
		console.error("Error getting hira alphabets :", error);
		throw error;
	}
}

async function getAllKataAlphabet(req, res) {
	try {
		const alphabets = await Alphabet.findAll({
			where: { [Op.or]: [{ type_id: 2 }, { type_id: 4 }, { type_id: 6 }] },
		});
		if (alphabets) {
			return responseWithData(res, 200, alphabets);
		} else {
			return badRequest(res, ALPHABET_GET_FAILED);
		}
	} catch (error) {
		console.error("Error getting all kata alphabets:", error);
		throw error;
	}
}

module.exports = {
	getAllAlphabet,
	getAllAlphabetByTypeId,
	getAllHigaAlphabet,
	getAllKataAlphabet,
};
