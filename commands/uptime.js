const dates = require('../dates.json');
const getUptime = require('../functions/getUptime.js');
const Discord = require('discord.js');


module.exports = {
	name: 'uptime',
	aliases: [ 'up' ],
	description: 'Gets the amount of time the bot has been live for',
	example: '',
	permissionRequired: 'all',
	execute(message, args) {
		const upTime = message.client.uptime;
		const now = new Date;
		const utc_timestamp = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);


		const bootTime = new Date(utc_timestamp - upTime);

		const embed = new Discord.RichEmbed()
			.setColor('#117EA6')
			.addField('Uptime', getUptime(message.client), false)

			.setFooter(`Last Booted: ${dates.days[bootTime.getDay()]}, ${dates.months[bootTime.getMonth()]} ${bootTime.getDate()}, ${bootTime.getFullYear()} ${bootTime.getHours() > 11 ? bootTime.getHours() - 12 : bootTime.getHours()}:${bootTime.getMinutes() > 9 ? bootTime.getMinutes() : '0' + bootTime.getMinutes()} ${bootTime.getHours() > 11 ? 'PM' : 'AM'}`);
		message.channel.send(embed);
	},
};