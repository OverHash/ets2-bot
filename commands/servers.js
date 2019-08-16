module.exports = {
	name: 'servers',
	description: 'Gets the amount of servers the bot is in.',
	example: 'servers',
	permissionRequired: 'all',
	execute(message, args) {
		message.channel.send(`Number of connected servers: **${message.client.guilds.size}**`);
	}
}