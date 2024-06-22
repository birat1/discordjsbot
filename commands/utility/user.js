const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        await interaction.reply(`${interaction.user.username} joined discord on ${moment(interaction.user.createdAt).format("DD/MM/YYYY LTS")}`);
    },
};