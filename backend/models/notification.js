"use strict";
module.exports = (sequelize, DataTypes) => {
	const Notification = sequelize.define(
		"Notification",
		{
			noti_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			is_read: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			action: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			target_id: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			source_id: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			noti_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			tableName: "notification",
			timestamps: false,
		},
	);

	return Notification;
};
