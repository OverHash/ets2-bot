const routes = require('../routes.json');

module.exports = {
	name: 'route',
	aliases: [ 'directions' ],
	description: 'Generates a route between two locations in ETS2',
	example: '',
	permissionRequired: 'all',
	execute(message, args) {
		let location1;
		let location2;
		while (true) {
			location1 = routes[Math.floor(Math.random() * routes.length)];
			location2 = routes[Math.floor(Math.random() * routes.length)];

			if (!(location1 === location2)) {
				break;
			}
		}

		message.channel.send(`**Start**: \`${location1}\`\n**End**: \`${location2}\``);
	},
};