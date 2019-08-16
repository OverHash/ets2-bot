module.exports = function(user, guild) {
	const members = guild.members.array();

	let max = members.length;

	for (let i = 0; i < max; i++) {
		if (members[i].user.bot) {
			members.splice(members.indexOf(members[i]), 1);
			max = max - 1;
		}
	}

	members.sort((a, b) => {
		return (a.joinedAt - b.joinedAt);
	});

	for (const i in members) {

		if (members[i].id == user.id) {
			return i;
		}
	}
};