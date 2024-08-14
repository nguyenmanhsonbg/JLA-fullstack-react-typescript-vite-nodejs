"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"GrammarExample",
			[
				{
					grammar_id: "1",
					grammar_example: " ge1",
					grammar_example_meaning: "gem1 ",
					grammar_example_status_id: 2,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("GrammarExample", null, {});
	},
};
