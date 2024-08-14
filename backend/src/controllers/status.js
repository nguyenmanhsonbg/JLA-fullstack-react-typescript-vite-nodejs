const { request } = require("express");
const { sequelize } = require("../../models");
const { responseWithData, error } = require("../handlers/response_handler");
const { QueryTypes } = require("sequelize");

async function getAllStatus(req, res) {
	try {
		// const status = await Status.findAll();
		const query = `Select * from status`;

		const status = await sequelize.query(query, {
			type: QueryTypes.SELECT,
		});
		return responseWithData(res, 200, status);
	} catch (err) {
		console.error("Error getting status", error);
		return error(res)
	}
}

module.exports = {
	getAllStatus,
};
