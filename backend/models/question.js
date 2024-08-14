"use strict";
module.exports = (sequelize, DataTypes) => {
	const Question = sequelize.define(
		"Question",

		{
			question_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			quiz_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "quiz",
					key: "quiz_id",
				},
			},
			question_content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			question_answer: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			question_type_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "questiontype",
					key: "question_type_id",
				},
			},
			question_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		},
		{
			tableName: "question",
			timestamps: false,
		},
	);

	return Question;
};
