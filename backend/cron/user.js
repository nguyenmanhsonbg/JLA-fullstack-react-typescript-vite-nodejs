const { User } = require("../models");

async function cleanupInactiveUsers() {
	const twoMonthAgo = new Date(new Date() - 60 * 24 * 60 * 60 * 1000);
	await User.destroy({
		where: {
			status: 0,
			deactivationDate: {
				[Sequelize.Op.lt]: twoMonthAgo,
			},
		},
	});
}

module.exports = cleanupInactiveUsers;
