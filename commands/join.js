const joinChannel = require('../functions/joinChannel.js');

module.exports = {
	name: 'join',
	description: 'joins your voice channel',
	async execute(message) {
		if (message.member.voiceChannel) {
			joinChannel(message);
		} else {
			message.channel.send('Please join a voice channel!');
		}
	},
};