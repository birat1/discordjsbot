require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const folders = fs.readdirSync(foldersPath);

for (const folder of folders) {
    const commandsPath = path.join(foldersPath, folder);
    const commands = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commands) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const events = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of events) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.DISCORD_TOKEN);