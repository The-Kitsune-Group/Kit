const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm-rf')
		.setDescription('Bans user')
		.addUserOption(option => option.setName('user').setDescription('User to ban').setRequired(true))
		.addBooleanOption(option => option.setName('grant_appeal').setDescription('If ban is appealable').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for ban')),
	async execute(interaction) {
		const perpetrator = interaction.member;
		const target = interaction.options.getUser('user');
		let reason = interaction.options.getString('reason');
		if (!reason) reason = 'No reason specified.';
		const appealable = interaction.options.getBoolean('grant_appeal');
		let banTxt = `# Connection terminated!
* You were removed for violating the rules.
> Reasoning - ${reason}
> Issuing staff - <@!${perpetrator.id}>
> Timeframe - NaN`;
		const appealTxt = `
* You may appeal by reaching out to <@!${perpetrator.id}> (recommended) or by filling out [this form](https://docs.google.com/forms/d/e/1FAIpQLSclGzlmTRNfcjgy9vYUG69SjmzBh2wIhmlHdCwU8T98p3eY-w/viewform).`;
		if (appealable) banTxt += appealTxt;
		if (target.id == 1203405947951775765n || target.id == 1203455871028432896n) {
			await interaction.reply(`Ha ha... very funny, <@!${perpetrator.id}>.`);
		}
		else if (target.id == perpetrator.id) {
			await interaction.reply('You can\'t ban yourself, idiot.');
		}
		else if (perpetrator.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]) || perpetrator.id === interaction.guild.ownerId) {
			await interaction.guild.members.fetch({ target, force: true })
				.then((member) => {
					try {
						member.send(banTxt)
							.then(`BanEvent: Pre-ban Notice sent to ${target.username}`);
					}
					catch (err) {
						console.error(`BanEvent Error: Pre-ban notice failed with code ${err.rawError.code}.`);
					}
				})
				.then((member) => {
					member.ban({ reason: reason });
				})
				.finally(() => {
					console.log(`BanEvent: ${target.username} banned by ${perpetrator.user.username} for reason ${reason}`);
				})
				.catch((error) => {
					interaction.reply({ content: `BanEvent Error:\n\`\`\`${error}\`\`\``, ephemeral: true });
				});
			await interaction.reply({ content: ':thumbsup:', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}
	},
};