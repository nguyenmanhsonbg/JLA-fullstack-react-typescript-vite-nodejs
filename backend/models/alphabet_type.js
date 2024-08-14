"use strict";
module.exports = (sequelize, DataTypes) => {
	const AlphabetTypes = sequelize.define(
		"AlphabetType",
		{
			type_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			type_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "alphabettype",
			timestamps: false,
		},
	);

	return AlphabetTypes;
};
