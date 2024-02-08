const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moveit')
		.setDescription('Shouts move message')
		.addUserOption(option => option.setName('user').setDescription('User to be yelled at').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for shout')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		let reason = interaction.options.getString('reason');
		if (!reason) reason = 'No reason specified.';
		const perpetrator = interaction.user;
		if (user.id == 1203405947951775765n || user.id == 1203455871028432896n) {
			await interaction.reply(`Ha ha... very funny, <@!${perpetrator.id}>.`);
		}
		else if (user.id == perpetrator.id) {
			await interaction.reply('I think you\'re supposed to know the rules, don\'t you?');
		}
		else if (interaction.member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]) || interaction.member.id === interaction.guild.ownerId) {
			await interaction.guild.members.fetch({ user, force: true })
				.then((member) => {
					try {
						member.timeout(30 * 1000, reason);
					}
					catch (error) {
						interaction.reply(`Error happened:\n\`\`\`${error}\`\`\``);
					}
				})
				.finally(() => {
					interaction.reply(`System Message - <@${user.id}>\`\`\`╔═════════════════════════════════════╗
║  == System Message Information ==   ║
║   __ ________  ____                 ║
║  / // / __/\\ \\/ / /    This is a    ║
║ / _  / _/   \\  /_/      warning!    ║
║/_//_/___/   /_(_)                   ║
║ If you wish to continue this topic, ║
║ move to #serious-stuff or to DMs!   ║
╚═════════════════════════════════════╝\`\`\`Please move to <#990353251452981328>. This incident will be logged.
For details, please speak with <@!${perpetrator.id}> or ping the <@&976679611851223081>/<@&882443822498467840> if you feel there was an issue.`);
				})
				.catch((error) => {
					interaction.reply({ content: `a doodoo happened:\n\`\`\`${error}\`\`\``, ephemeral: true });
				});
		}
		else {
			await interaction.reply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}

	},
};