const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the server.'),
    async execute(interaction) {
        await interaction.reply(`${interaction.guild.name} has ${interaction.guild.memberCount} members.`);
    },
};