"use strict";
module.exports = (sequelize, DataTypes) => {
	const Option = sequelize.define(
		"Option",
		{
			option_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			option_content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			question_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "question",
					key: "question__id",
				},
			},
		},
		{
			tableName: "option",
			timestamps: false,
		},
	);

	return Option;
};
