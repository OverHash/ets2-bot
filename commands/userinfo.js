const getUserInfo = require('../functions/getUserInfo.js');

module.exports = {
	name: 'userinfo',
	description: 'Gets information about a user',
	arguments: '[@person(s)]',
	example: 'userinfo @OverHash @OtherPerson',
	permissionRequired: 'all',
	guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size) {
			const info = getUserInfo(message.author, message.guild);
			message.channel.send(info);
		}
		else {
			message.mentions.users.map(user => {
				const info = getUserInfo(user, message.guild);
				message.channel.send(info);
			});
		}
	}
}