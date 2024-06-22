const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server.'),
    async execute(interaction) {
        await interaction.reply(`${interaction.guild.name} has ${interaction.guild.memberCount} members.`);
    },
};