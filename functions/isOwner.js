const { owners } = require('../config.json');

module.exports = function(message) {
	return new Promise(function(resolve, reject) {
		let isBotOwner = false;
		for (const i in owners) {
			if (message.author.id === owners[i]) {
				isBotOwner = true;
			}
		}

		if (!isBotOwner) {
			reject();
		}

		resolve();
	});
}