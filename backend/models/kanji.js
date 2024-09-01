"use strict";
module.exports = (sequelize, DataTypes) => {
	const Kanji = sequelize.define(
		"Kanji",

		{
			kanji_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			day_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "day",
					key: "day_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			kanji_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			cv_spelling: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			kanji_kunyomi: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			kanji_onyomi: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			kanji_image: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			kanji_status_id: {
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
			tableName: "kanji",
			timestamps: false,
		},
	);
	return Kanji;
};
