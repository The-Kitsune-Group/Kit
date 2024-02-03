const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm-rf')
		.setDescription('Bans user'),
	async execute(interaction) {
		await interaction.reply('Banned!');
	},
};