module.exports = function(user) {
	console.log(`https://cdn.discordapp.com/${user.id}/${user.avatar}.png`);
	return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
};