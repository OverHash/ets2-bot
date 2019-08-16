const isGuildOwner = require('../functions/isGuildOwner.js');

module.exports = {
	name: 'leave',
	description: 'Makes the bot leave the server',
	example: '',
	permissionRequired: 'server owner',
	guildOnly: true,
	execute(message, args) {
		isGuildOwner(message)
			.then(() => {
				message.channel.send('Leaving server...');
				message.guild.leave();
			}, function() {
				message.channel.send('Sorry! This action can only be completed by a server owner');
			});
	}
}