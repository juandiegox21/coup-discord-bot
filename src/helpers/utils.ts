import { ButtonInteraction, CommandInteraction } from "discord.js";
import GamePlayerService from "../services/GamePlayerService";
import state from "../store/state";
import { card, gameCard, gamePlayer } from "../types/coup";
import { STATE } from "./constants";
import gameTurnActionMenu from "../components/gameTurnActionMenu";

const getCardsByUserId = async (userDiscordId: string) => {
    const loadedCards = await state.get(STATE.LOADED_CARDS);
    const playersCards = await state.get(STATE.PLAYERS_CARDS);
    
    const [ firstCard, secondCard ] = playersCards.assigned.filter((card: gameCard) => card.gamePlayerDiscordId === userDiscordId)
    
    return [
        loadedCards.find((loadedCard: card) => loadedCard.id === firstCard.cardId),
        loadedCards.find((loadedCard: card) => loadedCard.id === secondCard.cardId)
    ];
};

const getPlayersFromGame = async (gameId: number): Promise<gamePlayer[]> => {
    const gamePlayerService = new GamePlayerService(gameId);
    const players = await gamePlayerService.getPlayersGame();

    return players;
};

const formatUserMention = (userDiscordId: string) => `<@${userDiscordId}>`;

const isPlayersTurn = async (discordId: string): Promise<boolean> => {
    const playerTurnDiscordId = await state.get(STATE.PLAYER_TURN_DISCORD_ID);
    return playerTurnDiscordId === discordId;
};

const nextPlayerTurn = async () => {
    const gamePlayers = await state.get(STATE.GAME_PLAYERS);

    if (gamePlayers.length === 0) {
        throw new Error('No players in the game.');
    }

    const playerTurnDiscordId = await state.get(STATE.PLAYER_TURN_DISCORD_ID);
    
    let nextPlayerIndex;
    if (playerTurnDiscordId) {
        const currentPlayerIndex = gamePlayers.findIndex((player: gamePlayer) => player.discordId === playerTurnDiscordId);
        nextPlayerIndex = (currentPlayerIndex + 1) % gamePlayers.length;
    } else {
        nextPlayerIndex = 0;
    }

    const nextPlayerDiscordId = gamePlayers[nextPlayerIndex].discordId;

    await state.set(STATE.PLAYER_TURN_DISCORD_ID, nextPlayerDiscordId);
    return nextPlayerDiscordId;
};

const sendPlayerTurnMessage = async (interaction: CommandInteraction | ButtonInteraction, discordId: string) => {
    const userMention = formatUserMention(discordId);
    const turnMsg = `:video_game: It's your turn now ${userMention}, please select an action...`;

    await interaction.channel?.send({
        content: turnMsg,
        components: [
            ...gameTurnActionMenu()
        ],
        allowedMentions: {
            users: [discordId]
        }
    });
};

export {
    getCardsByUserId,
    getPlayersFromGame,
    formatUserMention,
    isPlayersTurn,
    nextPlayerTurn,
    sendPlayerTurnMessage
}