"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Vocabulary",
			[
				{
					lesson_id: "1",
					vocab_name: "VN1 ",
					vocab_kanji: " VK1",
					vocab_meaning: "VM1 ",
					vocab_example: "VE1 ",
					vocab_image: " VI1",
					vocab_status_id: 2,
					vocab_audio: " VA1",
				},
				{
					lesson_id: "1",
					vocab_name: "VN2",
					vocab_kanji: " VK2",
					vocab_meaning: "VM2",
					vocab_example: "VE2",
					vocab_image: " VI2",
					vocab_status_id: 2,
					vocab_audio: " VA2",
				},
				{
					lesson_id: "1",
					vocab_name: "VN3",
					vocab_kanji: " VK3",
					vocab_meaning: "VM3",
					vocab_example: "VE3",
					vocab_image: " VI3",
					vocab_status_id: 2,
					vocab_audio: " VA3",
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Vocabulary", null, {});
	},
};
