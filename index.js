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

client.login(process.env.TOKEN);