"use strict";
module.exports = (sequelize, DataTypes) => {
	const AccountQuiz = sequelize.define(
		"AccountQuiz",
		{
			account_quiz_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			account_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "account",
					key: "account_id",
				},
			},
			quiz_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "quiz",
					key: "quiz_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			finish_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			quiz_point: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			tableName: "accountquiz",
			timestamps: false,
		},
	);

	return AccountQuiz;
};
