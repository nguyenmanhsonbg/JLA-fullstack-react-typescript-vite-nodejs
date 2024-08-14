"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Week",
			[
				{
					
					week_name: " ",
					course_id: 1,
					week_status_id: 2,
					week_image: " ",
					week_deadline: 20/10/2023,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Week", null, {});
	},
};
