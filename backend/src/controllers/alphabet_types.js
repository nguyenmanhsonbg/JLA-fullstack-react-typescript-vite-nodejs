const { AlphabetTypes } = require("../../models");
const { responseWithData } = require("../handlers/response_handler");

async function getAllAlphabetTypes(req, res) {
	try {
		const alphabet_types = await AlphabetTypes.findAll();
		return responseWithData(res, 200, alphabet_types);
	} catch (error) {
		console.error("Error getting alphabet types:", error);
		throw error;
	}
}

module.exports = {
	getAllAlphabetTypes,
};