"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _) {
		await queryInterface.bulkInsert(
			"Role",
			[
				{
					role_name: "Admin",
				},
				{
					role_name: "Content manager",
				},
				{
					role_name: "Content creator",
				},
				{
					role_name: "User",
				},
			],
			{},
		);
	},

	async down(queryInterface, _) {
		await queryInterface.bulkDelete("Role", null, {});
	},
};
