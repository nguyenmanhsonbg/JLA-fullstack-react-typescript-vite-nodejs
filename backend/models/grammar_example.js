"use strict";
module.exports = (sequelize, DataTypes) => {
	const GrammarExample = sequelize.define(
		"GrammarExample",
		{
			grammar_example_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			grammar_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "grammar",
					key: "grammar_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			grammar_example: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			grammar_example_meaning: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			grammar_example_status_id: {
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
			tableName: "grammarexample",
			timestamps: false,
		},
	);

	return GrammarExample;
};
