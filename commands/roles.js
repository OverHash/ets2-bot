module.exports = {
	name: 'roles',
	description: 'Gets a list of server roles and amount of members for each',
	example: '',
	execute(message, args) {
		const roles = message.guild.roles.sort((a, b) => b.calculatedPosition - a.calculatedPosition);
		let result = '```\n';
		roles.map(role => {
			result += role.name + '			' + role.members.size + ' members\n';
		});

		result += '```';
		message.channel.send(result);
	},
};