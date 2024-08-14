"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Question",
			[
				{
					quiz_id: "1",
					question_content: "QC1",
					question_answer: "QA1 ",
					question_type_id: 2,
					question_status_id: 2,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Question", null, {});
	},
};
