const Discord = require('discord.js');

const getUptime = require('../functions/getUptime.js');

module.exports = {
	name: 'ping',
	aliases: [ 'lag' ],
	description: 'Gets the ping of the bot to discord servers.',
	example: 'ping',
	permissionRequired: 'all',
	execute(message, args) {
		message.channel.send('pinging...').then(m => {
			const embed = new Discord.RichEmbed()
				.setAuthor('Pong!')
				.setColor('#3395D6')

				.addField('Bot Latency', (m.createdTimestamp - message.createdTimestamp) + 'ms', true)
				.addField('API latency', Math.round(message.client.ping) + 'ms', true)

				.setFooter(`Uptime: ${getUptime(message.client)}`);
			m.edit(embed);
		});
	},
};