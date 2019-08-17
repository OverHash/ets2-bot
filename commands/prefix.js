const quickDb = require('quick.db');

const isModerator = require('../functions/isModerator.js');

module.exports = {
	name: 'prefix',
	description: 'Sets the prefix for the server',
	permissionRequired: 'mod',
	guildOnly: true,
	aliases: [ 'p' ],
	example: ' -',
	arguments: '[prefix]',
	execute(message, args) {
		if (!isModerator(message.member)) return message.channel.send('This function can only be done by a moderator!');
		quickDb.set('guildPrefix_' + message.guild.id, args[0]);
		message.channel.send('The prefix for this server was set to `' + args[0] + '`');
	},
};