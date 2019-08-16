module.exports = {
	name: 'ping',
	aliases: [ 'lag' ],
	description: 'Gets the ping of the bot to discord servers.',
	example: 'ping',
	permissionRequired: 'all',
	execute(message, args) {
		message.channel.send(`pong! (**${Math.round(message.client.ping)} ms**)`);
	},
};