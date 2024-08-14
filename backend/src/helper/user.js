function omitPassword(user) {
	const { password, refresh_token, ...userWithoutPassword } = user.dataValues;
	return userWithoutPassword;
}

module.exports = { omitPassword };
