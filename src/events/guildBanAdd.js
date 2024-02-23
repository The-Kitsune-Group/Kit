const { Events } = require('discord.js');
const fs = require('fs');
let bans = [];
const dateUnixNow = Math.floor(Date.now() / 1000);

module.exports = {
	name: Events.GuildBanAdd,
	async execute(ban) {
		try {
			bans = JSON.parse(fs.readFileSync('bans.json'));
		}
		catch(error) {
			console.error('No Bans.json')
		}
		await ban.guild.bans.fetch(ban.user, { force: true })
			.then((yeet) => {
				if (yeet.reason.includes('[rm]')) {
					console.log(`${yeet.user.username}#${yeet.user.discriminator} has been yeeted until ${dateUnixNow + 86400}`);
					bans.push([yeet.user.id, dateUnixNow]);
					fs.writeFileSync('bans.json', JSON.stringify(bans));
				}
			})
			.catch(console.error);
	},
};
