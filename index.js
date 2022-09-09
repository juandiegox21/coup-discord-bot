import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";
import commands from "./commands/index.js";

dotenv.config();

import {
    Client,
    Intents,
    Collection,
} from "discord.js";

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

const TOKEN = process.env['TOKEN'];

const TEST_GUILD_ID = process.env['TEST_GUILD_ID'];

console.log(TOKEN, TEST_GUILD_ID);

let commandsData = [];

// Creating a collection for commands in client
client.commands = new Collection();

for (const command of commands) {
    commandsData.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');

    // Registering the commands in the client
    const CLIENT_ID = client.user.id;

    const rest = new REST({
        version: '9'
    }).setToken(TOKEN);
    (async () => {
        try {
            if (!TEST_GUILD_ID) {
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID), {
                        body: commandsData
                    });

                console.log('Successfully registered application commands globally');
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), {
                        body: commandsData
                    });

                console.log('Successfully registered application commands for development guild');

                const channel = await client.channels.fetch('915103361110536215');

                // console.log(await channel.guild.emojis.fetch("1016881673641672774"));
                // console.log(await channel.guild.emojis.fetch("1016881673641672774"));
                // <:contessa3:1017241120465498144>
                //     <:contessa4:1017241118976528497>
                //     <:contessa5:1017241118582263818>
                //     <:contessa6:1017241117307179008>

                const string = "<:contessa1:1017241123028226078><:contessa2:1017241121979641957>\n<:contessa3:1017241120465498144><:contessa4:1017241118976528497>\n<:contessa5:1017241118582263818><:contessa6:1017241117307179008>";

                channel.send(string);
            }
        } catch (error) {
            console.error(error);
        }
    })();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) {
        return;
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error)

        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Login to Discord with your client's token
client.login(TOKEN);
