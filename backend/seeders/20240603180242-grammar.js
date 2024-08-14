"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Grammar",
			[
				{
					lesson_id: "1",
					grammar_name: " GN1",
					grammar_structure: "GS1 ",
					grammar_description: " GD1",
					grammar_image: "GI1 ",
					grammar_status_id: 2,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Grammar", null, {});
	},
};
