import dotenv from "dotenv";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

dotenv.config();

import { Client, Intents } from "discord.js";

const token = process.env['TOKEN'];

console.log("Bot is starting...");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

ready(client);
interactionCreate(client);

client.login(token);
