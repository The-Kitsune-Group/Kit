const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const settings = ['', '', ''];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Set stuff up')
		.addChannelOption(option => option.setName('log').setDescription('The log channel').setRequired(true))
		.addRoleOption(option => option.setName('mod').setDescription('Mod role').setRequired(true))
		.addRoleOption(option => option.setName('admin').setDescription('Admin role').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild)
		.setDMPermission(false),
	async execute(interaction) {
		const logg = interaction.options.getChannel('log');
		const modd = interaction.options.getRole('mod');
		const adminn = interaction.options.getRole('admin');
		settings[0] = logg.id;
		settings[1] = modd.id;
		settings[2] = adminn.id;
		fs.writeFileSync(`db/${interaction.guild.id}/settings.json`, JSON.stringify(settings));
		interaction.reply('Settings updated!');
	},
};