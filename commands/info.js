const fs = require('fs');
const Discord = require('discord.js');

const { version } = require('../config.json');

const getUptime = require('../functions/getUptime.js');

module.exports = {
	name: 'info',
	description: 'Gets information about the bot',
	example: '',
	permissionRequired: 'all',
	execute(message, args) {
		const embed = new Discord.RichEmbed()
			.setAuthor(message.client.user.username, message.client.user.displayAvatarURL)
			.setColor('#3395D6')

			.addField('Version', version, false)
			.addField('Creator', 'OverHash#6449', true)
			.addField('Servers', message.client.guilds.size, true)
			.addField('Users', message.client.users.size, true)

			.setFooter(`Uptime: ${getUptime(message.client)}`);

		message.channel.send(embed);
	},
};