"use strict";
module.exports = (sequelize, DataTypes) => {
	const AccountWeek = sequelize.define(
		"AccountWeek",
		{
			account_week_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			account_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "account",
					key: "account_id",
				},
			},
			week_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "week",
					key: "week_id",
				},
			},
			finish_date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			tableName: "accountweek",
			timestamps: false,
		},
	);


	return AccountWeek;
};
