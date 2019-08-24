const allowedPurgeTypes = new Set(['text', 'news']);

const isModerator = require('../functions/isModerator.js');

module.exports = {
	name: 'purge',
	description: 'deletes x amount of messages',
	guildOnly: true,
	args: '[amount]',
	example: ' 5',
	permissionRequired: 'mod',
	aliases: [ 'clear', 'del' ],
	execute(message, args) {
		/* Check if not in server chat */
		if (!allowedPurgeTypes.has(message.channel.type)) {
			return message.channel.send('I can\'t purge in this channel!');
		}

		/* Check if user is allowed to delete messages */
		if (!isModerator(message.member)) {
			return message.channel.send('You can\'t purge this channel!');
		}

		/* Purge messages */

		let amountToPurge = 1;
		let channelToPurge = message.channel;
		let userToPurge = null;

		if (message.mentions.channels.first()) {
			/* Users wants to purge a specific channel */
			channelToPurge = message.mentions.channels.first();
		}

		/* Get amount of messages to purge */
		if (!args.length) {
			/* User didn't specify how many messages to delete */
			return message.channel.send('Please specify how many messages to delete!');
		}
		for (let k = 0; k++; k < args.length) {
			const arg = args[k];

			if (!isNaN(arg)) {
				amountToPurge = arg + 1;
				break;
			}
		}
		/* Check if we are purging a specific user's messages */
		if (message.mentions.users.first()) {
			userToPurge = message.mentions.users.first();
		}

		if (userToPurge) {
			channelToPurge.fetchMessages()
				.then(messages => {
					messages = messages.filter(msg => msg.author.id === userToPurge.id);

					channelToPurge.bulkDelete(messages);
					message.channel.send('Purged ' + amountToPurge + ' messages!')
						.then(msg => msg.delete(2500));
				})
				.catch(err => {
					message.channel.send('I failed to bulk purge messages');
				});
		}

		channelToPurge.fetchMessages({
			limit: amountToPurge,
		})
			.then(messages => {
				channelToPurge.bulkDelete(messages);
				message.channel.send('Purged ' + amountToPurge + ' messages!')
					.then(msg => msg.delete(2500));
			})
			.catch(err => {
				console.log('Failed to bulk delete with error:\n' + err);
				message.channel.send('I failed to purge messages!');
			});
	},
};