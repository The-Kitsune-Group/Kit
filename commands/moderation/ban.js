const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm-rf')
		.setDescription('Permabans user')
		.addUserOption(option => option.setName('user').setDescription('User to ban').setRequired(true))
		.addBooleanOption(option => option.setName('ban_evading').setDescription('If user is ban-evading').setRequired(true))
		.addBooleanOption(option => option.setName('grant_appeal').setDescription('If ban is appealable').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for ban')),
	async execute(interaction) {
		const target = interaction.options.getUser('user');
		const perpetrator = interaction.member;
		const banEvasion = interaction.options.getBoolean('ban_evading');
		const appealable = interaction.options.getBoolean('grant_appeal');
		let targetBannable = false;
		let reason = interaction.options.getString('reason');
		if (!reason && banEvasion) reason = 'Ban evasion';
		if (!reason) reason = 'No reason specified.';
		let banTxt = `# Connection terminated!
			* You were removed for violating the rules.
			> Reasoning - ${reason}
			> Issuing staff - <@!${perpetrator.id}>
			> Timeframe - Permanent`;
		const banEvasionTxt = `# Connection terminated!
			* Please tell me you know what a ban is... Do. Not. Return. PERIOD.
			> Reasoning - ${reason}
			> Issuing staff - <@!${perpetrator.id}>
			> Timeframe - Permanent
			* Your IP was logged for obvious reasons. Please note that you also lost your ability to appeal your removal, and you will not be allowed back in. Ever.`;
		const appealTxt = `
			* You may appeal by reaching out to <@!${perpetrator.id}> (recommended) or by filling out [this form](https://docs.google.com/forms/d/e/1FAIpQLSclGzlmTRNfcjgy9vYUG69SjmzBh2wIhmlHdCwU8T98p3eY-w/viewform).`;
		if (appealable) banTxt += appealTxt;
		await interaction.guild.members.fetch(target, { force: true })
			.then((member) => {
				targetBannable = member.bannable;
			})
			.catch(error => console.error(`BanEvent Error: Unable to determine whether or not user is bannable. ${error}`));
		if (target.id == 1203405947951775765n || target.id == 1203455871028432896n) {
			await interaction.reply(`Ha ha... very funny, <@!${perpetrator.id}>.`);
		}
		else if (target.id == perpetrator.id) {
			await interaction.reply({ content: 'You can\'t ban yourself, idiot.', ephemeral: true });
		}
		else if (!targetBannable) {
			await interaction.reply({ content: 'Unable to ban this user.', ephemeral: true });
		}
		else if (perpetrator.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]) || perpetrator.id === interaction.guild.ownerId) {
			try {
				if (banEvasion) {
					await target.send(banEvasionTxt);
				}
				else {
					await target.send(banTxt);
				}
				console.log(`BanEvent: Pre-ban Notice sent to ${target.username}#${target.discriminator}`);
			}
			catch (error) {
				console.error(`BanEvent Error ${error.rawError.code}: Pre-ban notice failed. ${error.rawError.message}`);
			}
			try {
				await interaction.guild.members.ban(target, { reason: reason });
				console.log(`BanEvent: ${target.username}#${target.discriminator} banned by ${perpetrator.username}#${perpetrator.discriminator} for reason "${reason}"`);
				await interaction.reply({ content: 'Permanent Ban issued successfully! The user shouldn\'t return now.', ephemeral: true });
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