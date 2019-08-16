const { variants } = require('../config.json');

module.exports = function(list) {
	return list[Math.floor(Math.random() * list.length)];
};