require('dotenv').config();

const { REST, Routes } = require('discord.js');
const { clientId, guildId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const folders = fs.readdirSync(foldersPath);

for (const folder of folders) {
    const commandsPath = path.join(foldersPath, folder);
    const commands = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commands) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`); 

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId),
            { body: commands },
        );
        
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();