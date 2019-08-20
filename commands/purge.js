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
		if ((args && args[0] && !isNaN(args[0]))) {
			amountToPurge = args[0];
		}

		message.channel.fetchMessages({
			limit: amountToPurge,
		})
			.then(messages => {
				message.channel.bulkDelete(messages);
				message.channel.send('Purged ' + amountToPurge + ' messages!')
					.then(msg => {
						msg.delete(2000);
					});
			})
			.catch(err => {
				console.log('Failed to bulk delete with error:\n' + err);
				message.channel.send('I failed to purge messages!');
			});
	},
};