const fs = require('fs');
const dateUnixNow = Math.floor(Date.now() / 1000);
let bans = new Array();
const scheduledUnbans = [];

const getBan = function(arr, m, n) {
	if (!n) n = 0;
	switch (m) {
	case 'b':
		return arr[n][0];
	case 't':
		return arr[n][1];
	default:
		break;
	}
};

module.exports = {
	delBan(arr, n) {
		arr.splice(n, 1);
		return;
	},
	save() {
		fs.writeFileSync('bans.json', JSON.stringify(bans));
		return;
	},
	getUnban() {
		bans = JSON.parse(fs.readFileSync('bans.json'));
		for (const i in bans) {
			const bannedUser = getBan(bans, 'b', i);
			const bannedTime = getBan(bans, 't', i);
			if (dateUnixNow > Number(bannedTime) + 86400) {
				console.log(`User ${bannedUser} unbanned`);
				scheduledUnbans.push(bans[i]);
			}
		}
		return scheduledUnbans;
	},
};