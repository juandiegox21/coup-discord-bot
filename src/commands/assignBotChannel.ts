import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import state from "../store/state";

export const assignBotChannel: Command = {
    name: "assignbotchannel",
    description: "Assigns a channel for the bot to interact",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        await state.set(STATE.BOT_CHANNEL_ID, "someid");

        const content = `Bot has been assigned to channel name: something (ID: something)`;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
