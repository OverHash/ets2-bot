module.exports = {
	name: 'git',
	aliases: [ 'github', 'g', 'repository', 'source' ],
	description: 'gets the repository for the bot',
	example: '',
	permissionRequired: 'all',
	execute(message, args) {
		message.channel.send('Github repository: https://github.com/OverHash/ets2-bot\nLatest changes: https://github.com/OverHash/ets2-bot/compare/dev?expand=1');
	},
};