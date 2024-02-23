const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const bitch = new EmbedBuilder().setImage('https://jaezu.net/trash/kit/bitch.jpg');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bitch')
		.setDescription('bitch.jpg'),
	async execute(interaction) {
		await interaction.reply({ embeds: [bitch] });
	},
};