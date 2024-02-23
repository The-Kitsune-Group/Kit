const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand() && !interaction.isModalSubmit()) return;
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command && !interaction.isModalSubmit()) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		if (interaction.isModalSubmit()) {
			await interaction.reply({ content: 'Thank you for the info' });
		}
		else {
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
		}
	},
};
