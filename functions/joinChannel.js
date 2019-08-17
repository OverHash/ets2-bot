module.exports = async function(message) {
	if (message.guild.voiceConnection && (message.guild.voiceConnection.channel !== message.member.voiceChannel)) {
		message.guild.voiceConnection.disconnect();
	}
	return message.member.voiceChannel.join();
};