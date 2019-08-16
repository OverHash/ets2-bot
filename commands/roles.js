const Discord = require('discord.js');

module.exports = {
	name: 'roles',
	description: 'Gets a list of server roles and amount of members for each',
	example: '',
	execute(message, args) {
		const roles = message.guild.roles.sort((a, b) => b.calculatedPosition - a.calculatedPosition);
		const embed = new Discord.RichEmbed()
			.setTitle(`Roles in ${message.guild.name}`)

			.addField('Role Name:', roles.map(role => role), true)
			.addField('Member Count:', roles.map(role => role.members.size), true)

			.setTimestamp()
			.setColor('#00ff44');

		message.channel.send(embed);
	},
};