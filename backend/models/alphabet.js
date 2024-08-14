"use strict";
module.exports = (sequelize, DataTypes) => {
	const Alphabet = sequelize.define(
		"Alphabet",
		{
			alphabet_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			type_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "alphabettype",
					key: "type_id",
				},
			},
			japanese_character: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			romaji_character: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			alphabet_audio: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			alphabet_image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "alphabet",
			timestamps: false,
		},
	);

	// Alphabet.associate = function (models) {
	// 	Alphabet.hasMany(models.User, { foreignKey: "StatusId", as: "users" });
	// };

	return Alphabet;
};
