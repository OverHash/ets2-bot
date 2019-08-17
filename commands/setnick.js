module.exports = {
	name: 'setnick',
	description: 'Set the nickname of a user',
	aliases: [ 'nick' ],
	example: '@OverHash#6449 Bot Developer',
	arguments: '[user] [nickname]',
	guildOnly: true,
	permissionRequired: 'setNickname',
	execute(message, args) {
		const user = message.member;

		if (user.hasPermission('MANAGE_NICKNAMES')) {
			if (message.mentions.users.size) {
				message.guild.fetchMember(message.mentions.users.array()[0])
					.then(guildMember => {
						let newNick = '';

						for (let k = 0; k < args.length; k++) {
							const arg = args[k];
							console.log(arg, message.mentions.users.array()[0].id);

							if (arg.indexOf(message.mentions.users.array()[0].id) !== -1) {
								newNick += arg + ' ';
							}
							newNick -= ' ';
						}

						guildMember.setNickname(newNick)
							.then(() => message.channel.send('Successfully updated username!'))
							.catch((err) => message.channel.send('Failed to update permission with reason ' + err));
					})
					.catch((err) => message.channel.send(err));
			} else {
				message.channel.send('Please tag the user you want to change the nickname of!');
			}
		}
	},
};