"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"KanjiWord",
			[
				{
					kanji_id: 1,
					kanji_word: " KW1",
					hiragana_character: " HC1",
					kanji_word_meaning: " ",
					kanji_word_status_id: 2,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("KanjiWord", null, {});
	},
};
