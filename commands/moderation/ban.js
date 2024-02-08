const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm-rf')
		.setDescription('Bans user')
		.addUserOption(option => option.setName('user').setDescription('User to ban').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for ban'))
		.addBooleanOption(option => option.setName('grant_appeal').setDescription('If ban is appealable')),
	async execute(interaction) {
		const perpetrator = interaction.user;
		const user = interaction.options.getUser('user');
		let reason = interaction.options.getBoolean('reason');
		if (!reason) reason = 'No reason specified.';
		const appealable = interaction.options.getString('grant_appeal');
		const guild = 'Azerbaijan & South Africa Cozy Corner';
		let banTxt = `# Connection terminated!
* You were removed for violating the rules.
> Reasoning - ${reason}
> Issuing staff - <@!${perpetrator.id}>
> Timeframe - NaN`;
		const appealTxt = `
* You may appeal by reaching out to <@!${perpetrator.id}> or (recommended) or by filling out [this form](https://docs.google.com/forms/d/e/1FAIpQLSclGzlmTRNfcjgy9vYUG69SjmzBh2wIhmlHdCwU8T98p3eY-w/viewform).`;
	if (appealable) banTxt += appealTxt;
		if (interaction.member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]) || interaction.member.id === interaction.guild.ownerId) {
			try {
				await user.send(`You were banned from ${guild} for the following reason:\n${reason}`);
			}
			catch (err) {
				console.error(`Error ${err.rawError.code} while sending pre-ban notice. ${err.rawError.message}`);
			}
			await interaction.guild.members.ban(user, [0, reason]);
			await interaction.reply({ content: ':thumbsup:', ephemeral: true });
			await interaction.channel.send('Banned ' + user + ' because of ' + reason);
		}
		else {
			await interaction.reply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}
	},
};