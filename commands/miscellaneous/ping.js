const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Measures latency'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pong!', fetchReply: true });
		interaction.editReply(`Pong! \`\`${sent.createdTimestamp - interaction.createdTimestamp}ms\`\``);
	},
};