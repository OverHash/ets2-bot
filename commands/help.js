const { prefix } = require('../config.json');
const quickDb = require('quick.db');

module.exports = {
	name: 'help',
	aliases: [ 'commands' ],
	description: 'List all commands, or a specific command',
	example: '[command name]',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		const guildPrefix = quickDb.fetch('guildPrefix_' + message.guild.id);

		if (!args.length) {
			if (message.guild) {
				data.push(`The prefix for ${message.guild.name} is ${guildPrefix || process.env.PREFIX || prefix}`);
			}
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.readableName ? command.readableName : command.name).join('\n'));
			data.push(`\nYou can use \`${guildPrefix || process.env.PREFIX || prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return;
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.arguments) data.push(`**Arguments:** ${guildPrefix || process.env.PREFIX || prefix}${command.name} ${command.arguments}`);
		if (command.example) data.push(`**Usage:** ${guildPrefix || process.env.PREFIX || prefix}${command.name} ${command.example}`);

		message.channel.send(data, { split: true });
	},
};