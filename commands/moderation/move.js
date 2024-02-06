const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moveit')
		.setDescription('MoveItToSeriousChannel ahh command')
		.addUserOption(option => option.setName('user').setDescription('User to ban').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const perpetrator = interaction.user;
		if (user.id == 1203405947951775765n || user.id == 1203455871028432896n) {
			await interaction.reply(`Ha ha... very funny, <@!${perpetrator.id}>.`);
		}
		else if (interaction.member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]) || interaction.member.id === interaction.guild.ownerId) {
			await interaction.reply(`System Message - <@${user.id}>\`\`\`
   __ ________  ____═════════════════╗
  / // / __/\\ \\/ / /    This is a    ║
 / _  / _/   \\  /_/      warning!    ║
/_//_/___/   /_(_)                   ║
║ If you wish to continue this topic ║
║ move to #serious-stuff or to DMS!  ║
╚════════════════════════════════════╝\`\`\`This incident will be logged.
<#990353251452981328>
For details, please speak with <@!${perpetrator.id}> or ping the <@&976679611851223081>/<@&882443822498467840> if you feel there was an issue.`);
		}
		else {
			await interaction.reply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}

	},
};