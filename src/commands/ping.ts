import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import state from "../store/state";

export const ping: Command = {
    name: "ping",
    description: "Replies with pong",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const currentGameId = await state.get(STATE.CURRENT_GAME_ID);

        const content = `Pong ${currentGameId}`;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
