const Discord = require('discord.js');
const request = require('request');

const quote_data = {
	method: 'GET',
	url: 'https://api.quotable.io/random',
	qs: { },
};

module.exports = {
	name: 'quote',
	description: 'Gets a random quote',
	aliases: [ 'q' ],
	permissionRequired: 'all',
	example: '',
	execute(message, args) {
		request(quote_data, function(error, response, quote) {
			if (error) {
				console.error(error);
				return message.channel.send('Error attempting to get a quote');
			}

			// turn the response into a readable array
			quote = JSON.parse(quote);

			// create a discord embed
			const embed = new Discord.RichEmbed()
				.setAuthor(quote.author)
				.setColor('#' + Math.floor(Math.random() * 1677215).toString(16))

				.setDescription(quote.content)

				.setFooter('Quote ID: ' + quote._id)
				.setTimestamp();

			// post the quote!
			message.channel.send(embed);
		});
	},
};