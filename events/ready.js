const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Login "${readyClient.user.tag}" and running`);
		client.user.setPresence({
			activities: [{
				name: 'Kit-Unstable',
				state: 'Mentally bashing my head against the wall',
				type: ActivityType.Playing,
			}],
			status: 'online',
		});
	},
};
