"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Course",
			[
				{
					course_name: "JPD113",
					description: "First japanese course in FPT University",
					week: 10,
					course_status_id: 2,
					course_image: "D/course/image/jpd113",
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Course", null, {});
	},
};
