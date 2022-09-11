import AxiosAdapter from "../adapters/AxiosAdapter";
import { handleHttpError } from "../adapters/httpHandler";
import { GamePlayerData, HttpHandlerResponse } from "../types/HttpHandler.type";

export default class GamePlayerService {
    endpoint: string;

    constructor(gameId: number) {
        this.endpoint = `/api/v1/games/${gameId}/players`;
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
}
