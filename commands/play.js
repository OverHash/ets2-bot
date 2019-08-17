const YTDL = require('ytdl-core');

global.musicQueues = [];
const joinChannel = require('../functions/joinChannel.js');

function playSong(connection, message) {
	const server = global.musicQueues[message.guild.id];

	if (server.dispatcher) return;

	server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: 'audioonly' }));
	server.queue.shift();
	server.dispatcher.on('end', function() {
		if (server.queue[0]) {
			server.dispatcher = null;
			playSong(connection, message);
		}
	});
}

module.exports = {
	name: 'play',
	description: 'Plays a song',
	aliases: [ 'music' ],
	async execute(message, args) {
		if (!args.length) {
			return message.channel.send('Please enter a youtube URL to play!');
		}

		if (message.member.voiceChannel) {
			if (!global.musicQueues[message.guild.id]) {
				global.musicQueues[message.guild.id] = { queue: [] };
			}

			joinChannel(message)
				.then(connection => {
					const server = global.musicQueues[message.guild.id];
					server.queue.push(args[0]);
					playSong(connection, message);
				});
		} else {
			message.channel.send('Please join a voice channel!');
		}
	},
};