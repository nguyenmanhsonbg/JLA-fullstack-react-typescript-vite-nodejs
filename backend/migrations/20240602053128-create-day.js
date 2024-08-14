"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("day", {
			day_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			day_name: {
				type: Sequelize.STRING,
			},
			course_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "course",
					key: "course_id",
				},
			},
			day_status_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "status",
					key: "status_id",
				},
			},
			day_image: {
				type: Sequelize.STRING,
			},
			day_deadline: {
				type: Sequelize.DATE,
			},
		});


		await queryInterface.createTable("lesson", {
			lesson_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			day_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "day",
					key: "day_id",
				},
			},
			lesson_description: {
				type: Sequelize.STRING,
			},
			lesson_type_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "quiztype",
					key: "quiz_type_id",
				},
			},
			lesson_status_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		});

		await queryInterface.createTable("Enroll", {
			enroll_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			account_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "account",
					key: "account_id",
				},
			},
			course_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "course",
					key: "course_id",
				},
			},
			enrolled_date: {
				type: Sequelize.DATE,
			},
			deadline: {
				type: Sequelize.DATE,
			},
			enroll_status_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("day");
		await queryInterface.dropTable("Enroll");
		await queryInterface.dropTable("lesson");
	},
};
