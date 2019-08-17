module.exports = {
	name: 'announce',
	description: 'create an announcement',
	aliases: [ 'ann' ],
	arguments: '[channel]',
	example: '#general',
	permissionRequired: 'mod',
	guildOnly: true,
	execute(message) {
		message.reply('yeah not done yet sorry HAHAA');
	},
};