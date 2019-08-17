const fs = require('fs');
const quickDb = require('quick.db');
const Discord = require('discord.js');
const { prefix, welcomeChannels, isTesting } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Successfully logged in!');
	if (!isTesting) {
		client.guilds.forEach(guild => {
			for (const k in welcomeChannels) {
				const channel = welcomeChannels[k];
				if (guild.channels.find(guildChannel => guildChannel.name == channel)) {
					// guild.channels.find('name', channel).send(`Bot is now online! The prefix for this server is **${prefix}**`);
					break;
				}
			}
		});
	}
});

client.on('guildCreate', guild => {
	console.log(`Joined the server ${guild.name}`);
	const guildPrefix = quickDb.fetch('guildPrefix_' + guild.id);

	for (const k in welcomeChannels) {
		const channel = welcomeChannels[k];
		if (guild.channels.find('name', channel)) {
			guild.channels.find('name', channel).send(`Hello 👋! The prefix for this bot is ${guildPrefix || process.env.PREFIX || prefix}.\nYou can get a list of commands by doing ${guildPrefix || process.env.PREFIX || prefix}help`);
			break;
		}
	}
});

client.on('guildDelete', guild => {
	console.log(`Left the server ${guild.name}`);
});

client.on('message', message => {
	const guildPrefix = quickDb.fetch('guildPrefix_' + message.guild.id);
	// handle getting the prefix if the bot needs to reply with it
	if (message.mentions.users.size && message.mentions.users.first()) {
		if (message.mentions.users.first().id == client.user.id) {
			if (!(message.content.toLowerCase().indexOf('prefix') === -1)) {
				message.channel.send(`The prefix for this server is **${guildPrefix || process.env.PREFIX || prefix}**`);
			}
		}
	}

	// this was either a invalid command, or a bot was talking
	if (!message.content.startsWith(guildPrefix || process.env.PREFIX || prefix) || message.author.bot) return;

	const args = message.content.slice((guildPrefix || process.env.PREFIX || prefix).length).split(/ +/);
	const commandName = args.shift().toLowerCase();


	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	console.log(`handling command ${commandName} from ${message.author.username}#${message.author.discriminator} || ${message.author.id}`);

	if (command.args && !args.length) {
		let reply = `You didnt provide any arguments, ${message.author}`;

		if (command.arguments) {
			reply += `\nExample arguments can be: \`${command.arguments}\``;
		}
		if (command.example) {
			reply += `\nAn example of correct usage is: \`${guildPrefix || process.env.PREFIX || prefix}${command.example}\``;
		}

		return message.channel.send(reply);
	}
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute this command inside DMs!');
	}

	try {
		command.execute(message, args, Discord);
	} catch (error) {
		console.log(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// put the enviromental file into process.env
require('dotenv').config();
console.log('LOGGING IN WITH TOKEN ' + process.env.BOT_TOKEN);
client.login(process.env.BOT_TOKEN);