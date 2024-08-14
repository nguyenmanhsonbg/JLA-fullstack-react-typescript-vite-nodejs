"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Day",
			[
				{
					day_name: " ",
					course_id: 1,
					day_status_id: 2,
					day_image: " ",
					day_deadline: new Date("2024-12-02T00:00:00Z"),
				},
			],
			{},
		); // create day

		await queryInterface.bulkInsert(
			"Lesson",
			[
				{
					day_id: 1,
					lesson_description: "....",
					lesson_type_id: 1,
					lesson_status_id: 2,
				},
			],
			{},
		);
		// create lesson

		await queryInterface.bulkInsert(
			"Kanji",
			[
				{
					lesson_id: "1",
					kanji_name: " KN1",
					cv_spelling: "CV1 ",
					kanji_kunyomi: "KUN1",
					kanji_onyomi: "ON1",
					kanji_image: "KI1",
					kanji_status_id: 2,
				},
				{
					lesson_id: "1",
					kanji_name: " KN2",
					cv_spelling: "CV2 ",
					kanji_kunyomi: "KUN2",
					kanji_onyomi: "ON2",
					kanji_image: "KI2",
					kanji_status_id: 2,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Day", null, {});
		await queryInterface.bulkDelete("Lesson", null, {});
		await queryInterface.bulkDelete("Kanji", null, {});
	},
};
