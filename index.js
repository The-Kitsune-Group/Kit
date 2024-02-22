const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const ON_DEATH = require('death');
const cron = require('node-cron');
const checkUnban = require('./check.js');

dotenv.config();

ON_DEATH(function(signal, err) {
	console.log(`Quit because of ${err}`);
	client.destroy();
});

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildModeration],
});

cron.schedule('*/10 * * * *', () => {
	const bans = JSON.parse(fs.readFileSync('bans.json'));
	const tmp_unba = checkUnban.getUnban();
	let tmp_guil;
	client.guilds.fetch(process.env.GUILD_DEV, { force: true })
		.then((guild) => {
			tmp_guil = guild;
		})
		.catch(console.error);
	if (tmp_unba.length > 0) {
		for (const i of tmp_unba) {
			tmp_guil.members.unban(i[0], { reason: 'End of temp ban' })
				.then(target => console.log(`Unbanned ${target.username}#${target.discriminator} from ${tmp_guil.name}`))
				.then(checkUnban.delBan(bans, bans.indexOf(i)))
				.catch(console.error);
		}
		checkUnban.save();
	}
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.TOKEN_DEV);