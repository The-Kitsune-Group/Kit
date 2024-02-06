const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os-utils');
const osu = require('node-os-utils');
const cpu = osu.cpu;

/* os.cpuUsage(function(v) {
	console.log('CPU Usage (%): ' + v);
}); */

const cpuUsage = cpu.loadavg();
const ramTotal = Math.round(os.totalmem());
const ramFree = Math.round(os.freemem());
const ramUsage = Math.round((ramFree / ramTotal) * 100);
const netUsage = -1;

const infoMsg = new EmbedBuilder()
	.setColor('#abcdef')
	.setTitle('Bot Stats')
	.setDescription('The bot\'s Statistics page for things like the CPU/memory/network usage, amount of servers the bot is in, etc. (A value of -1 means not retrievable)')
	.setThumbnail('https://raw.githubusercontent.com/itsragedev/pcounter/gh-pages/pCounter.png')
	.addFields(
		{ name: 'CPU usage', value: cpuUsage.toString() + '%', inline: true },
		{ name: 'Memory usage', value: ramUsage.toString() + '% out of ' + ramTotal + ' MB', inline: true },
		{ name: 'Network usage', value: netUsage.toString() + '%', inline: true },
	)
	.setTimestamp()
	.setFooter({ text: 'Kit-Unstable', iconURL: 'https://raw.githubusercontent.com/The-Kitsune-Group/Kit/main/iconbitch.png' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Displays basic statistics about the bot'),
	async execute(interaction) {
		await interaction.reply({ embeds: [infoMsg] });
	},
};