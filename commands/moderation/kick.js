const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm')
		.setDescription('Kicks (temp-bans) user')
		.addUserOption(option => option.setName('user').setDescription('User to kick').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for kick')),
	async execute(interaction) {
		const perpetrator = interaction.member;
		const target = interaction.options.getUser('user');
		let targetKickable = false;
		let reason = interaction.options.getString('reason');
		if (!reason) reason = 'No reason specified.';
		reason += '[rm]';
		const kickTxt = `# Connection closed!
* You have been temporarily yeeted lmao
> Reasoning - ${reason.replaceAll('[rm]', '')}
> Issuing staff - <@!${perpetrator.id}>
> Timeframe - 24 hours (not implemented yet)
* Wait until time has passed, then come again or something idk`;
		await interaction.guild.members.fetch(target, { force: true })
			.then((member) => {
				targetKickable = member.kickable;
			})
			.catch(error => console.error(`KickEvent Error: Unable to determine whether or not user is kickable. ${error}`));
		if (target.id == 1203405947951775765n || target.id == 1203455871028432896n) {
			await interaction.reply(`Ha ha... very funny, <@!${perpetrator.id}>.`);
		}
		else if (target.id == perpetrator.id) {
			await interaction.reply({ content: 'You can\'t kick yourself, idiot.', ephemeral: true });
		}
		else if (!targetKickable) {
			await interaction.reply({ content: 'Unable to kick this user.', ephemeral: true });
		}
		else if (interaction.member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]) || interaction.member.id === interaction.guild.ownerId) {
			try {
				await target.send(kickTxt);
				console.log(`KickEvent: Pre-kick Notice sent to ${target.username}#${target.discriminator}`);
			}
			catch (error) {
				console.error(`KickEvent Error ${error.rawError.code}: Pre-kick notice failed. ${error.rawError.message}`);
			}
			try {
				await interaction.guild.members.ban(target, { reason: reason });
				console.log(`KickEvent: ${target.username}#${target.discriminator} kicked by ${perpetrator.user.username}#${perpetrator.user.discriminator} for reason "${reason.replaceAll('[rm]', '')}"`);
				await interaction.reply({ content: 'Temporary Ban issued successfully! The user has been notifed of the ban and its reasoning.', ephemeral: true });
			}
			catch (error) {
				console.error(`BanEvent Error: ${error}`);
				await interaction.reply({ content: 'Something went wrong. Please refer to the console for more details.', ephemeral: true });
			}
		}
		else {
			await interaction.reply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}
	},
};