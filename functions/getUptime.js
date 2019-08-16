module.exports = function(client) {
	let totalSeconds = Math.floor(client.uptime / 1000);
	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	return `${days > 0 ? days + ' ' + (days > 1 ? 'days, ' : 'day, ') : ''}${hours > 0 ? hours + ' ' + (hours > 1 ? 'hrs, ' : 'hr, ') : ''}${minutes > 0 ? minutes + ' ' + (minutes > 1 ? 'mins, ' : 'min, ') : ''}${seconds > 0 ? seconds + ' ' + (seconds > 1 ? 'secs ' : 'sec') : ''}`;
};