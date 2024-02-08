const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm')
		.setDescription('Kicks user')
		.addUserOption(option => option.setName('user').setDescription('User to kick').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for kick')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason');
		const guild = 'Azerbaijan & South Africa Cozy Corner';
		if (user.id == 1203405947951775765n || user.id == 1203455871028432896n) {
			await interaction.reply(`Ha ha... very funny, <@!${perpetrator.id}>.`);
		}
		else if (user.id == perpetrator.id) {
			await interaction.reply('You can\'t kick yourself, idiot.');
		}
		else if (interaction.member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]) || interaction.member.id === interaction.guild.ownerId) {
			if (!reason) {
				try {
					await user.send('You were kicked from ' + guild);
				}
				catch (err) {
					console.error('While kick occurr "Error ' + err.rawError.code + ': ' + err.rawError.message + '"');
				}
				await interaction.guild.members.kick(user);
				await interaction.reply({ content: ':thumbsup:', ephemeral: true });
				await interaction.channel.send('Kicked ' + user);
			}
			else {
				try {
					await user.send('You were Kicked from ' + guild + ' for the following reason:\n' + reason);
				}
				catch (err) {
					console.error('While kick occurr "Error ' + err.rawError.code + ': ' + err.rawError.message + '"');
				}
				await interaction.guild.members.kick(user, [0, reason ]);
				await interaction.reply({ content: ':thumbsup:', ephemeral: true });
				await interaction.channel.send('Kicked ' + user + ' because of ' + reason);
			}
		}
		else {
			await interaction.reply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}
	},
};