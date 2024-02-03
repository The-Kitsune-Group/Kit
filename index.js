const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const ON_DEATH = require('death');

dotenv.config();

ON_DEATH(function(signal, err) {
	console.log('[SIGNAL=' + signal + ';ERROR=' + err + '].BYE()');
	client.destroy();
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Allahu Akbar! Logged in as "${readyClient.user.tag}" and ready to recite the Quran`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(process.env.TOKEN_DEV);