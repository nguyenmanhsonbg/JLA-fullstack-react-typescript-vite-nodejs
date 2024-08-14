"use strict";
module.exports = (sequelize, DataTypes) => {
	const Grammar = sequelize.define(
		"Grammar",
		{
			grammar_id: {
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
			grammar_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			grammar_structure: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			grammar_description: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			grammar_image: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			grammar_status_id: {
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
			tableName: "grammar",
			timestamps: false,
		},
	);

	return Grammar;
};
