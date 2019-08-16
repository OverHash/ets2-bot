module.exports = {
	name: 'servericon',
	description: 'Retrieves the server icon',
	example: 'servericon',
	permissionRequired: 'all',
	guildOnly: true,
	execute(message, args) {
		if (message.guild.icon) {
			const serverIcon = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`;
			message.channel.send('', { files: [serverIcon] });
		}
		else {
			message.channel.send('I was unable to find a server icon! Please upload one!');
		}
	},
};