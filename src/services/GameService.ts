import AxiosAdapter from "../adapters/AxiosAdapter";
import { handleHttpError } from "../adapters/httpHandler";
import { HttpHandlerResponse } from "../types/HttpHandler.type";

export default class GameService {
    endpoint: string;

    constructor() {
        this.endpoint = "/api/v1/games";
    }

    async loadCardAttributes(): Promise<HttpHandlerResponse> {
        const genericErrorMessage = "Oops! something went wrong, card attributes were not loaded.";

        try {
            const response = await AxiosAdapter.get(`${this.endpoint}/cards`);
            return response;
        } catch (error) {
            return handleHttpError(error, genericErrorMessage);
        }
    }

    async createGame(): Promise<HttpHandlerResponse> {
        const genericErrorMessage = "Oops! something went wrong, game was not created.";

        try {
            const response = await AxiosAdapter.post(this.endpoint);
            return response;
        } catch (error) {
            return handleHttpError(error, genericErrorMessage);
        }
    }

    async softDeleteGame(gameId: number): Promise<HttpHandlerResponse> {
        const genericErrorMessage = "Oops! something went wrong, game was not soft deleted.";

        const endpoint = `${this.endpoint}/${gameId}/end`

        try {
            const response = await AxiosAdapter.delete(endpoint);

            return response;
        } catch (error) {
            return handleHttpError(error, genericErrorMessage);
        }
    }

    async startGame(gameId: number): Promise<HttpHandlerResponse> {
        const genericErrorMessage = "Oops! something went wrong, the match was not started.";

        const endpoint = `${this.endpoint}/${gameId}/start`

        try {
            const response = await AxiosAdapter.post(endpoint);
            return response;
        } catch (error) {
            return handleHttpError(error, genericErrorMessage);
        }
    }

    async getActiveGame(): Promise<HttpHandlerResponse> {
        const genericErrorMessage = "Oops! something went wrong, the active game was not retrieved.";

        try {
            const response = await AxiosAdapter.get(this.endpoint);
            return response;
        } catch (error) {
            return handleHttpError(error, genericErrorMessage);
        }
    }
}
