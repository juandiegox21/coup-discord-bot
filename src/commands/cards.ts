import { Client, CommandInteraction, ApplicationCommandType } from 'discord.js';
import { Command } from "../command";
import generateCardEmoji from "../helpers/cardEmojiBuilder";
import { CARD_NAMES_TO_EMOJIS, EMOJIS, STATE } from "../helpers/constants";
import { card } from '../types/coup';
import state from '../store/state';
import { getCardsByUserId } from '../helpers/utils';

export const cards: Command = {
    name: "cards",
    description: "Shows you the cards you have been given.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const userId = interaction.user.id;

        const [firstCard, secondCard] = await getCardsByUserId(userId);

        const title = `The cards you have been assigned are ${firstCard.name} and ${secondCard.name}.\n`;

        const firstCardEmojis = generateCardEmoji(CARD_NAMES_TO_EMOJIS[firstCard.name as keyof typeof CARD_NAMES_TO_EMOJIS]);
        const secondCardEmojis = generateCardEmoji(CARD_NAMES_TO_EMOJIS[secondCard.name as keyof typeof CARD_NAMES_TO_EMOJIS]);

        let content = `${title}\n`;
        content += firstCardEmojis.top + EMOJIS.WHITESPACES + secondCardEmojis.top + "\n";
        content += firstCardEmojis.mid + EMOJIS.WHITESPACES + secondCardEmojis.mid + "\n";
        content += firstCardEmojis.bottom + EMOJIS.WHITESPACES + secondCardEmojis.bottom + "\n";

        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ content: content });
        } else {
            await interaction.reply({ content: content });
        }
    }
};
