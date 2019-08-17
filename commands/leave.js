module.exports = {
	name: 'leave',
	description: 'Makes the bot leave the voice channel',
	example: '',
	permissionRequired: 'all',
	guildOnly: true,
	execute(message, args) {
		if (message.guild.voiceConnection) {
			message.guild.voiceConnection.disconnect();
			global.musicQueues[message.guild.id] = null;
		}
	},
};