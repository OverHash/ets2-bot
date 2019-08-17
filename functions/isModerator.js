module.exports = function(user) {
	console.log(user.permissions.FLAGS);
	return user.hasPermission('ADMINISTRATOR');
};