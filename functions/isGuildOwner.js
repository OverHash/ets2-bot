module.exports = function(message) {
	return new Promise(function(resolve, reject) {
		if (!(message.guild.owner.user.id === message.author.id)) {
			console.write('rejecting');
			reject();
		}

		resolve();
	});
};