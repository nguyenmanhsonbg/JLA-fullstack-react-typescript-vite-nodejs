const { NODE_ENV, DB_USER, DB_NAME, DB_HOST, DB_PASS, DB_PORT } = require("../variables/global");

const VARIABLE_VALID =
	NODE_ENV === "production"
		? {
				host: DB_HOST,
				username: DB_USER,
				password: DB_PASS,
				database: DB_NAME,
				dialect: "mysql",
				logging: false,
				seederStorage: "sequelize",
				seederStorageTableName: "SequelizeSeeder",
				timezone: "+07:00",
				port: DB_PORT,
		  }
		: NODE_ENV === "development"
		? {
				host: DB_HOST,
				username: DB_USER,
				password: DB_PASS,
				database: DB_NAME,
				dialect: "mysql",
				logging: false,
				seederStorage: "sequelize",
				seederStorageTableName: "SequelizeSeeder",
				timezone: "+07:00",
				port: DB_PORT,
		  }
		: NODE_ENV === "test"
		? {
				host: DB_HOST,
				username: DB_USER,
				password: DB_PASS,
				database: DB_NAME,
				dialect: "mysql",
				logging: false,
				seederStorage: "sequelize",
				seederStorageTableName: "SequelizeSeeder",
				timezone: "+07:00",
				port: DB_PORT,
		  }
		: null;

module.exports = VARIABLE_VALID;
