import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../command";
import gameTurnActionMenu from "../components/gameTurnActionMenu";

export const ping: Command = {
    name: "ping",
    description: "Replies with pong",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.deferReply();

        const turnMsg = `:video_game: Let's play! it's Juan's turn, please wait...`;

        await interaction.followUp({
            content: turnMsg,
            components: [
                ...gameTurnActionMenu()
            ]
        });
    }
};
