const isOwner = require('../functions/isOwner.js');

module.exports = {
	name: 'restart',
	description: 'shuts down the bot for temporary maintenece (e.g. bot upgrades)',
	example: 'restart',
	permissionRequired: 'bot owner',
	execute(message, args) {
		isOwner(message)
			.then(() => {
				message.client.guilds.forEach(guild => {
					let latestMessageTimestamp;
					let latestMessageChannel;
					guild.channels.filter(channel => channel.type == 'text').forEach(channel => {
						if (channel.lastMessage) {
							const msg = channel.lastMessage;
							if (msg.createdTimestamp > (latestMessageTimestamp ? latestMessageTimestamp : 0)) {
								latestMessageTimestamp = msg;
								latestMessageChannel = channel;
							}
						}
					});

					if (latestMessageChannel) {
						latestMessageChannel.send('Bot is restarting, please allow a few minutes for the bot to come back live again.');
					}
				});
				message.client.destroy();
			}, () => {
				message.channel.send('You do not have sufficient privileges to shutdown.');
			});
	},
};