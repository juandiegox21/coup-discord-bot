import AxiosAdapter from "../adapters/AxiosAdapter";
import { handleHttpError } from "../adapters/httpHandler";
import { HttpHandlerResponse } from "../types/HttpHandler.type";

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
}
