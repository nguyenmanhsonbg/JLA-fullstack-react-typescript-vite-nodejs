"use strict";
module.exports = (sequelize, DataTypes) => {
	const AccountDay = sequelize.define(
		"AccountDay",
		{
			account_day_id: {
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
			day_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "day",
					key: "day_id",
				},
			},
			day_process: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "accountday",
			timestamps: false,
		},
	);

	return AccountDay;
};
