"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("KanjiWord", {
			kanji_word_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			kanji_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Kanji",
					key: "kanji_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			kanji_word: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			hiragana_character: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			kanji_word_meaning: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			kanji_word_status_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("KanjiWord");
	},
};
