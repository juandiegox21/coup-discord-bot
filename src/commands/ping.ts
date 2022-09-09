import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";

export const ping: Command = {
    name: "ping",
    description: "Replies with pong",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "Pong";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
