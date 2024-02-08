const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moveit')
		.setDescription('Shouts move message')
		.addUserOption(option => option.setName('user').setDescription('User to be yelled at').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for yell')),
	async execute(interaction) {
		const target = interaction.options.getUser('user');
		const perpetrator = interaction.user;
		let reason = interaction.options.getString('reason');
		if (!reason) reason = 'No reason specified.';
		if (target.id == 1203405947951775765n || target.id == 1203455871028432896n) {
			await interaction.reply(`Ha ha... very funny, <@!${perpetrator.id}>.`);
		}
		else if (target.id == perpetrator.id) {
			await interaction.reply('I think you\'re supposed to know the rules, don\'t you?');
		}
		else if (interaction.member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]) || interaction.member.id === interaction.guild.ownerId) {
			await interaction.deferReply();
			await interaction.guild.members.fetch(target.id)
				.then((member) => {
					try {
						member.timeout(30 * 1000, reason);
						interaction.editReply(`System Message - <@${target.id}>\`\`\`╔═════════════════════════════════════╗
║  == System Message Information ==   ║
║   __ ________  ____                 ║
║  / // / __/\\ \\/ / /    This is a    ║
║ / _  / _/   \\  /_/      warning!    ║
║/_//_/___/   /_(_)                   ║
║ If you wish to continue this topic, ║
║ move to #serious-stuff or to DMs!   ║
╚═════════════════════════════════════╝\`\`\`Please move to <#990353251452981328>. This incident will be logged.
For details, please speak with <@!${perpetrator.id}> or ping the <@&976679611851223081>/<@&882443822498467840> if you feel there was an issue.`);
						console.log(`WarnEvent: ${target.username}#${target.discriminator} warned by ${perpetrator.username}#${perpetrator.discriminator} for reason "${reason}"`);
						// interaction.followUp({ content: ':thumbsup:', ephemeral: true });
					}
					catch (error) {
						console.error(`WarnEvent Error: Warn failed. ${error}`);
						interaction.editReply({ content: ':thumbsdown:', ephemeral: true });
					}
				})
				.catch((error) => {
					console.error(`WarnEvent ${error}`);
					interaction.editReply({ content: ':thumbsdown:', ephemeral: true });
				});
		}
		else {
			await interaction.editReply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}

	},
};