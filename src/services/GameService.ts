import AxiosAdapter from "../adapters/AxiosAdapter";
import { handleHttpErrorMessage } from "../adapters/httpHandler";

export default class GameService {
    endpoint: string;

    constructor() {
        this.endpoint = "/api/v1/games";
    }

    async createGame(): Promise<string> {
        const genericErrorMessage = "Oops! something went wrong, game was not created.";

        try {
            const { data } = await AxiosAdapter.post(this.endpoint);

            return `Game has been created with ID: ${data.id}`;
        } catch (error) {
            return handleHttpErrorMessage(error, genericErrorMessage);
        }
    }
}
