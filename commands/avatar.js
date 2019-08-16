const Discord = require('discord.js');
const getUserAvatar = require('../functions/getUserAvatar.js');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
	name: 'avatar',
	aliases: [ 'icon', 'pfp', 'av' ],
	description: 'Gets a users\' avatar',
	arguments: '[user1, user2, user3]',
	example: '[user]',
	permissionRequired: 'all',
	guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size) {
			const info = getUserAvatar(message.author);
			message.channel.send('', { files: [info] });
		}
		else {
			message.mentions.users.map(user => {
				const info = getUserAvatar(user);
				if (info !== null) {
					const file = new Discord.RichEmbed()
						.setImage(info)
						.setFooter(user.username + '\'s avatar');
					message.channel.send('', file);
				}
				else {
					message.channel.send('Unable to get ' + user.username + '#' + user.discriminator + '\'s avatar');
				}
			});
		}
	},
};

// const avatar = `https://cdn.discordapp.com/${message.author.id}/${message.author.avatar}.png`;