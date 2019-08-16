const dates = require('../dates.json');
const { version, versionTimestamp } = require('../config.json');

module.exports = {
	name: 'version',
	aliases: [ 'ver', 'v', 'release' ],
	description: 'Gets the current version of the bot.',
	example: '',
	permissionRequired: 'all',
	execute(message, args) {
		const now = new Date;
		const utc_timestamp = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
		console.log(utc_timestamp + '\n' + utc_timestamp - (utc_timestamp - versionTimestamp));

		const bootTime = new Date(utc_timestamp - (utc_timestamp - versionTimestamp));

		const day = dates.day[bootTime.getDay()];
		const month = dates.months[bootTime.getMonth()];
		const date = bootTime.getDate();
		const year = bootTime.getFullYear();
		const hours = bootTime.getHours() > 11 ? bootTime.getHours() - 12 : bootTime.getHours();
		const minutes = bootTime.getMinutes() > 9 ? bootTime.getMinutes() : '0' + bootTime.getMinutes();
		const morningNight = bootTime.getHours() > 11 ? 'PM' : 'AM';

		message.channel.send(`I am currently version \`${version}\`\nVersion released: ${day}, ${month} ${date}, ${year} ${hours}:${minutes} ${morningNight} (UTC)`);
	},
};