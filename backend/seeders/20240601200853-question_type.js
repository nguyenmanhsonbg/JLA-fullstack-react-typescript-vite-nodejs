"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"QuestionType",
			[
				{
					question_type_name: "multiple",
				},
				{
					question_type_name: "shadowing",
				},
				{
					question_type_name: "fill",
				},
				{
					question_type_name: "reflex",
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("QuestionType", null, {});
	},
};
