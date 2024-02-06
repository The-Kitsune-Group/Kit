const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm-rf')
		.setDescription('Bans user')
		.addUserOption(option => option.setName('user').setDescription('User to ban').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for ban')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason');
		const guild = 'Azerbaijan & South Africa Cozy Corner';
		if(interaction.member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]) || interaction.member.id === interaction.guild.ownerId) {
			if(!reason) {
				try {
					await user.send('You were banned from ' + guild);
				}
				catch(err) {
					console.error('While ban occurr "Error ' + err.rawError.code + ': ' + err.rawError.message + '"');
				}
				await interaction.guild.members.ban(user);
				await interaction.reply({ content: ':thumbsup:', ephemeral: true });
				await interaction.channel.send('Banned ' + user);
			}
			else {
				try {
					await user.send('You were banned from ' + guild + ' for the following reason:\n' + reason);
				}
				catch(err) {
					console.error('While ban occurr "Error ' + err.rawError.code + ': ' + err.rawError.message + '"');
				}
				await interaction.guild.members.ban(user, [0, reason ]);
				await interaction.reply({ content: ':thumbsup:', ephemeral: true });
				await interaction.channel.send('Banned ' + user + ' because of ' + reason);
			}
		}
		else {
			await interaction.reply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}
	},
};