const { Role } = require("../models");

async function cleanupInactiveRoles() {
	const twoMonthAgo = new Date(new Date() - 60 * 24 * 60 * 60 * 1000);
	await Role.destroy({
		where: {
			status: 0,
			deactivationDate: {
				[Sequelize.Op.lt]: twoMonthAgo,
			},
		},
	});
}

module.exports = cleanupInactiveRoles;
