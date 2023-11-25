import AxiosAdapter from "../adapters/AxiosAdapter";
import { handleHttpError } from "../adapters/httpHandler";
import { GamePlayerData, HttpHandlerResponse } from "../types/HttpHandler.type";
import { gamePlayer } from "../types/coup";

export default class GamePlayerService {
    endpoint: string;

    constructor(gameId: number) {
        this.endpoint = `/api/v1/games/${gameId}/players`;
    }

    async getPlayersGame(): Promise<gamePlayer[]> {
        const response = await AxiosAdapter.get(this.endpoint);
        return response.data;
    }

    async createPlayerGame(playerData: GamePlayerData): Promise<HttpHandlerResponse> {
        const genericErrorMessage = "Oops! something went wrong, you were not able to join this game.";

        try {
            const response = await AxiosAdapter.post(this.endpoint, playerData);
            return response;
        } catch (error) {
            return handleHttpError(error, genericErrorMessage);
        }
    }

    async deletePlayerGame(playerDiscordId: string): Promise<HttpHandlerResponse> {
        const genericErrorMessage = "Oops! something went wrong, you were not able to join this game.";
        const endpoint = `${this.endpoint}/${playerDiscordId}`;

        try {
            const response = await AxiosAdapter.delete(endpoint);
            return response;
        } catch (error) {
            return handleHttpError(error, genericErrorMessage);
        }
    }
}
