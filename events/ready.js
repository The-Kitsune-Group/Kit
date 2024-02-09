const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Login "${client.user.tag}" and running`);
		client.user.setPresence({
			activities: [{
				name: 'Kit-Unstable',
				state: 'It fucking works',
				type: ActivityType.Playing,
			}],
			status: 'online',
		});
	},
};
