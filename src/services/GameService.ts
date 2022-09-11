import AxiosAdapter from "../adapters/AxiosAdapter";
import { handleHttpError } from "../adapters/httpHandler";
import { HttpHandlerResponse } from "../types/HttpHandler.type";
import moment from "moment";

export default class GameService {
    endpoint: string;

    constructor() {
        this.endpoint = "/api/v1/games";
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

    async deleteGame(gameId: number): Promise<HttpHandlerResponse> {
        const genericErrorMessage = "Oops! something went wrong, game was not deleted.";
        const currentDateTime = moment(new Date()).utc().format('YYYY-MM-DD H:mm:ss');

        const endpoint = `${this.endpoint}/${gameId}`

        try {
            const response = await AxiosAdapter.patch(endpoint, {
                dateEnded: currentDateTime
            });

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
}
