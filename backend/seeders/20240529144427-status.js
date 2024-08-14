"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Status",
			[
				{
					status_name: "pending",
				},
				{
					status_name: "active",
				},
				{
					status_name: "deactive",
				},
				{
					status_name: "done",
				},
				{
					status_name: "undone",
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Status", null, {});
	},
};
