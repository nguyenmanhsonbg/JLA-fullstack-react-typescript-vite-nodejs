"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Quiz",
			[
				{
					day_id: "1",
					quiz_name: " Quiz1",
					quiz_type_id: 1,
					quiz_status_id: 2,
					point: 0,
				},
				{
					day_id: "1",
					quiz_name: " Quiz2",
					quiz_type_id: 1,
					quiz_status_id: 2,
					point: 10,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Quiz", null, {});
	},
};
