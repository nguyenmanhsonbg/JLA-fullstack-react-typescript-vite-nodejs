"use strict";
module.exports = (sequelize, DataTypes) => {
	const Enroll = sequelize.define(
		"Enroll",
		{
			enroll_id: {
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
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			course_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "course",
					key: "course_id",
					onUpdate: "CASCADE",
					onDelete: "CASCADE",
				},
			},
			enrolled_date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			deadline: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			tableName: "enroll",
			timestamps: false,
		},
	);

	return Enroll;
};
