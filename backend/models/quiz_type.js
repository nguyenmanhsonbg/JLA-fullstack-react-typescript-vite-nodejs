"use strict";
module.exports = (sequelize, DataTypes) => {
	const QuizType = sequelize.define(
		"QuizType",
		{
			quiz_type_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			quiz_type_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			quiz_type_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		},
		{
			tableName: "quiztype",
			timestamps: false,
		},
	);

	return QuizType;
};
