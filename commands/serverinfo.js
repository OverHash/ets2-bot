const Discord = require('discord.js');

module.exports = {
	name: 'serverinfo',
	description: 'Gets information about the server',
	example: 'serverinfo',
	permissionRequired: 'all',
	guildOnly: true,
	execute(message, args) {
		const channelCategories = message.guild.channels.filter(channel => channel.type === 'category');
		let channelCategoriesCount = 0;
		channelCategories.forEach(() => {
			channelCategoriesCount++;
		});

		const textChannels = message.guild.channels.filter(channel => (channel.type === 'text' || channel.type === 'voice'));
		let textChannelCount = 0;
		let voiceChannelCount = 0;
		textChannels.forEach(channel => {
			if (channel.type === 'text') {
				textChannelCount++;
			}
			else if (channel.type === 'voice') {
				voiceChannelCount++;
			}
		});

		const members = message.guild.members;
		const humanCount = message.guild.members.filter(member => !member.user.bot).size;
		const botCount = message.guild.members.filter(member => member.user.bot).size;
		const roles = message.guild.roles;
		let onlineCount = 0;

		members.forEach(member => {
			if (!(member.presence.status === 'offline')) {
				onlineCount++;
			}
		});

		const embed = new Discord.RichEmbed()
			.setColor('#' + Math.floor(Math.random() * 1677215).toString(16))
			.setAuthor(message.guild.name, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)

			.addField('Owner', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
			.addField('Region', message.guild.region, true)
			.addField('Channel Categories', channelCategoriesCount, true)
			.addField('Text Channels', textChannelCount, true)
			.addField('Voice Channels', voiceChannelCount, true)
			.addField('Members', message.guild.memberCount, true)
			.addField('Humans', humanCount, true)
			.addField('Bots', botCount, true)
			.addField('Online', onlineCount, true)
			.addField('Roles', roles.size, true)
			.addField('Role List:', roles.map(r => `${r}`).join(', '), true)

			.setFooter(`ID: ${message.guild.id} | Server Created`)
			.setTimestamp(message.guild.createdAt);

		message.channel.send(embed);
	},
};