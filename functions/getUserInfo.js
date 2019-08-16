const Discord = require('discord.js');
const dates = require('../dates.json');
const getJoinRank = require('../functions/getJoinRank.js');
const getUserAvatar = require('../functions/getUserAvatar.js');

module.exports = function(user, guild) {
	const joinDate = user.createdAt;
	const guildJoinDate = guild.member(user).joinedAt;

	return new Discord.RichEmbed()
		.setColor('#4F545C')
		.setAuthor(`${user.username}#${user.discriminator}`, getUserAvatar(user))
		.setThumbnail(getUserAvatar(user))

		.setDescription(user.toString())

		.addField('Status', user.presence.status, true)
		.addField('Joined', `${dates.days[guildJoinDate.getDay()]}, ${dates.months[guildJoinDate.getMonth()]} ${guildJoinDate.getDate()}, ${guildJoinDate.getFullYear()} ${guildJoinDate.getHours() > 11 ? guildJoinDate.getHours() - 12 : guildJoinDate.getHours()}:${guildJoinDate.getMinutes() > 9 ? guildJoinDate.getMinutes() : '0' + guildJoinDate.getMinutes()} ${guildJoinDate.getHours() > 11 ? 'PM' : 'AM'}`, true)
		.addField('Join Position', getJoinRank(user, guild), true)
		.addField('Registered', `${dates.days[joinDate.getDay()]}, ${dates.months[joinDate.getMonth()]}, ${joinDate.getFullYear()} ${joinDate.getHours() > 11 ? joinDate.getHours() - 12 : joinDate.getHours()}:${joinDate.getMinutes() > 9 ? joinDate.getMinutes() : '0' + joinDate.getMinutes()} ${joinDate.getHours() > 11 ? 'PM' : 'AM'}`, true)


		.setFooter('ID: ' + user.id)
		.setTimestamp();
};