"use strict";
module.exports = (sequelize, DataTypes) => {
	const KanjiWord = sequelize.define(
		"KanjiWord",
		{
			kanji_word_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			kanji_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "kanji",
					key: "kanji_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			kanji_word: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			kanji_word_meaning: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			hiragana_character: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			kanji_word_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		},
		{
			tableName: "kanjiword",
			timestamps: false,
		},
	);

	return KanjiWord;
};
