import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";
import generateCardEmoji from "../helpers/cardEmojiBuilder";
import { EMOJIS } from "../helpers/constants";

export const ping: Command = {
    name: "ping",
    description: "Replies with pong",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const playerName = "Juan";

        const backOfCard = generateCardEmoji(EMOJIS.BACK_OF_CARD_EMOJIS);
        const contessaCard = generateCardEmoji(EMOJIS.CONTESSA_CARD_EMOJIS);

        let content = `${playerName}\n`;
        content += contessaCard.top + EMOJIS.WHITESPACES + backOfCard.top + "\n";
        content += contessaCard.mid + EMOJIS.WHITESPACES + backOfCard.mid + "\n";
        content += contessaCard.bottom + EMOJIS.WHITESPACES + backOfCard.bottom + "\n";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
