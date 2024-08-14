const { Role } = require("../../models");
const { responseWithData, error } = require("../handlers/response_handler");

async function getAllRoles(req, res) {
	try {
		const roles = await Role.findAll();
		return responseWithData(res, 200, roles);
	} catch (err) {
		console.error("Error getting roles:", error);
		return error(res);
	}
}

module.exports = {
	getAllRoles,
};
