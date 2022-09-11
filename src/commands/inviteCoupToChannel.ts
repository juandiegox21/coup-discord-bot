import { BaseCommandInteraction, Client, GuildChannel } from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import state from "../store/state";

export const inviteCoupToChannel: Command = {
    name: "invitecoup",
    description: "Registers the bot into the channel where interactions will occur",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const { id, name } = interaction.channel as GuildChannel;

        await state.set(STATE.BOT_CHANNEL_ID, id);

        const content = `:green_circle: COUP has joined channel #${name} (ID: ${id})`;

        await interaction.followUp({
            content
        });
    }
};
