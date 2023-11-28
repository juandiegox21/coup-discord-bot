import { CommandInteraction, Client, ApplicationCommandType, EmbedBuilder } from "discord.js";
import { Command } from "../command";

export const ping: Command = {
    name: "ping",
    description: "Replies with pong",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        const infoEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Information Title')
            .setDescription('This is the detailed information you want to convey.')
            .setTimestamp();
        
        interaction.channel?.send({ embeds: [infoEmbed] });
    }
};
