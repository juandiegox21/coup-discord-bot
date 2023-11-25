import { ButtonInteraction } from "discord.js";
import { CARD_NAMES_TO_EMOJIS, EMOJIS, STATE } from "../helpers/constants";
import state from "../store/state";
import { getCardsByUserId } from "../helpers/utils";
import generateCardEmoji from "../helpers/cardEmojiBuilder";
import { gamePlayer } from "../types/coup";

export default async function(interaction: ButtonInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const hasGameStarted = await state.get(STATE.HAS_GAME_STARTED);
    const currentGameId = await state.get(STATE.CURRENT_GAME_ID);

    if (!currentGameId) {
        return interaction.editReply({
            content: "There are no games active right now."
        });
    }

    if (!hasGameStarted) {
        return interaction.editReply({
            content: "The game hasn't started yet."
        });
    }

    const gamePlayers = await state.get(STATE.GAME_PLAYERS);
    const player = gamePlayers?.find((player: gamePlayer) => player.discordId === interaction.user.id);

    if (!player) {
        return interaction.editReply({
            content: "You are not in the game."
        });
    }
            
    const userId = interaction.user.id;

    const [firstCard, secondCard] = await getCardsByUserId(userId);

    const title = `These are your cards, ${firstCard.name} and ${secondCard.name}.\n`;

    const firstCardEmojis = generateCardEmoji(CARD_NAMES_TO_EMOJIS[firstCard.name as keyof typeof CARD_NAMES_TO_EMOJIS]);
    const secondCardEmojis = generateCardEmoji(CARD_NAMES_TO_EMOJIS[secondCard.name as keyof typeof CARD_NAMES_TO_EMOJIS]);

    let content = `${title}\n`;
    content += firstCardEmojis.top + EMOJIS.WHITESPACES + secondCardEmojis.top + "\n";
    content += firstCardEmojis.mid + EMOJIS.WHITESPACES + secondCardEmojis.mid + "\n";
    content += firstCardEmojis.bottom + EMOJIS.WHITESPACES + secondCardEmojis.bottom + "\n";

    await interaction.editReply({
        content
    });
}
