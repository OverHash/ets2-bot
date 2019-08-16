const isOwner = require('../functions/isOwner.js');

module.exports = {
	name: 'shutdown',
	description: 'shuts down the bot',
	example: 'shutdown',
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
						latestMessageChannel.send('Bot is shutting down for maintenence.');
					}
				});
				message.client.destroy();
			}, () => {
				message.channel.send('You do not have sufficient privileges to shutdown.');
			});
	},
};