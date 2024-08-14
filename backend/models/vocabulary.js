"use strict";
module.exports = (sequelize, DataTypes) => {
	const Vocabs = sequelize.define(
		"Vocabulary",
		{
			vocab_id: {
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
			vocab_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			vocab_kanji: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			vocab_meaning: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			vocab_example: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			vocab_image: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			vocab_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			vocab_audio: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "vocabulary",
			timestamps: false,
		},
	);

	return Vocabs;
};
