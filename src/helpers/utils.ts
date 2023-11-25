import GamePlayerService from "../services/GamePlayerService";
import state from "../store/state";
import { card, gameCard, gamePlayers } from "../types/coup";
import { STATE } from "./constants";

const getCardsByUserId = async (userDiscordId: string) => {
    const loadedCards = await state.get(STATE.LOADED_CARDS);
    const playersCards = await state.get(STATE.PLAYERS_CARDS);
    
    const [ firstCard, secondCard ] = playersCards.assigned.filter((card: gameCard) => card.gamePlayerDiscordId === userDiscordId)
    
    return [
        loadedCards.find((loadedCard: card) => loadedCard.id === firstCard.cardId),
        loadedCards.find((loadedCard: card) => loadedCard.id === secondCard.cardId)
    ];
};

const getPlayersFromGame = async (gameId: number): Promise<gamePlayers[]> => {
    const gamePlayerService = new GamePlayerService(gameId);
    const players = await gamePlayerService.getPlayersGame();

    return players;
};

const formatUserMention = (userDiscordId: string) => `<@${userDiscordId}>`;

export {
    getCardsByUserId,
    getPlayersFromGame,
    formatUserMention
}