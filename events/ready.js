const fs = require('node:fs');
const { Events, ActivityType } = require('discord.js');
import { banCron } from './index';

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
		fs.access('yeets.dat', fs.constants.F_OK, (error) => {
			if (error) {
				console.log('Database doesn\'t exist, creating one now...');
				var data = new Map();
				fs.writeFile('yeets.dat', data);
			}
		})
		banCron.start();
	},
};
