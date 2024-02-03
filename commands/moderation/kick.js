const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm')
		.setDescription('Kicks user'),
	async execute(interaction) {
		await interaction.reply('Kicked!');
	},
};