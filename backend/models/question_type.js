"use strict";
module.exports = (sequelize, DataTypes) => {
	const QuestionType = sequelize.define(
		"QuestionType",
		{
			question_type_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			question_type_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			question_type_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		},
		{
			tableName: "questiontype",
			timestamps: false,
		},
	);

	return QuestionType;
};
