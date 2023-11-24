import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../command";
import generateCardEmoji from "../helpers/cardEmojiBuilder";
import { CARD_NAMES_TO_EMOJIS, STATE } from "../helpers/constants";
import state from "../store/state";
import { card } from "../types/coup";

export const ping: Command = {
    name: "ping",
    description: "Replies with pong",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        // const cards: Array<card> = await state.get(STATE.LOADED_CARDS);

        const matchCards = await state.get(STATE.PLAYERS_CARDS);
        console.log(JSON.stringify(matchCards.assigned));
        
        const matchCardsString = JSON.stringify(matchCards, null, 2); // 'null, 2' for pretty printing

        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ content: matchCardsString });
        } else {
            await interaction.reply({ content: matchCardsString });
        }
    }
};
