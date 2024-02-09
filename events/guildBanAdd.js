const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildBanAdd,
	async execute(ban) {
		const dateUnixNow = Math.floor(Date.now() / 1000);
		await ban.guild.bans.fetch(ban.user, { force: true })
			.then((yeet) => {
				if (yeet.reason.includes('[rm]')) {
					console.log(`${yeet.user.username}#${yeet.user.discriminator} has been yeeted until ${dateUnixNow + 86400}`);
					set
					yeet.guild.members.unban(yeet.user, { reason: 'End of temp ban' });
				}
			})
			.catch(console.error);
	},
};
