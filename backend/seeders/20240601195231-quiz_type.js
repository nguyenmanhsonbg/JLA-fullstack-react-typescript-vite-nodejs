"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"QuizType",
			[
				{
					quiz_type_name: "vocab",
				},
				{
					quiz_type_name: "kanji",
				},
				{
					quiz_type_name: "grammar",
				},
				{
					quiz_type_name: "final",
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("QuizType", null, {});
	},
};
