const Discord = require('discord.js');


module.exports = {
	name: 'invite',
	description: 'creates an invite link for the bot',
	aliases: [ 'inv', 'i', 'link' ],
	example: '',
	permissionRequired: 'all',
	execute(message) {
		const embed = new Discord.RichEmbed()
			.setColor('#' + Math.floor(Math.random() * 1677215).toString(16))
			.setTitle('Invite link for ' + message.client.user.username)
			.setURL('https://discordapp.com/api/oauth2/authorize?client_id=606718061894172693&permissions=8&scope=bot')
			.setAuthor(message.author.username, '', 'https://discordapp.com/api/oauth2/authorize?client_id=606718061894172693&permissions=8&scope=bot')
			.setTimestamp();
		message.channel.send(embed);
	},
};