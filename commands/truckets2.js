const Discord = require('discord.js');
const { variants } = require('../config.json');
const { trucksETS2 } = require('../trucksETS2.json');
const pickRandomItem = require('../functions/pickRandomItem.js');

module.exports = {
	name: 'truckets2',
	readableName: 'truckETS2',
	description: 'Generates a random truck configuration',
	arguments: 'List of following properties are applicable: ```\nCabin\nChassis\nEngine\nTransmission\nInterior\nPaint\nBull Bar\nBull Bar Attachment\nDoor Handles\nDoor Step\nFront Badge\nFront Badge Plate\nFront Mask\nFront Mirror\nFront Wheels\nLight Bar\nLight Bar Attachment\nLower Grille Guard\nLower Grille Guard Attachment\nMain Mirrors\nRear Wheels\nLeft Exhaust Pipe\nRight Exhaust Pipe\nSteering Wheel\nSun Visor```',
	example: 'front wheels, rear wheels',
	permissionRequired: 'all',
	execute(message, args) {
		const actualArgs = [ '' ];
		if (args && args.length) {
			for (const i in args) {
				const arg = args[i];

				const indexOfComma = arg.indexOf(',');
				if (indexOfComma !== -1) {
					actualArgs[actualArgs.length - 1] += arg.substr(0, arg.length - 1);
					actualArgs[actualArgs.length] = '';
				} else {
					actualArgs[actualArgs.length - 1] += arg + ' ';
				}
			}
			const lastArg = actualArgs[actualArgs.length - 1];
			actualArgs[actualArgs.length - 1] = lastArg.substring(0, lastArg.length - 1);
		}

		console.log(actualArgs);


		const vehicle = pickRandomItem(trucksETS2);
		let description = '**Vehicle Name**: ' + vehicle[0] + '\n';

		for (const i in actualArgs) {
			const arg = actualArgs[i].toLowerCase();

			for (const k in variants) {
				const variant = variants[k].toLowerCase();

				if (variant === arg) {
					description += '**' + variant + '**: ' + pickRandomItem(vehicle[k]) + '\n';
					console.log('Found variant for ' + arg + ':' + variant);
				}
			}
		}

		const embed = new Discord.RichEmbed()
			.setColor('#' + Math.floor(Math.random() * 1677215).toString(16))
			.setAuthor(`${message.member.displayName}'s truck configuration`, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`)
			.setDescription(description)


			.setTimestamp()
			.setFooter('Bot made by OverHash#6449');
		message.channel.send(embed);
	},
};