import { Client } from "discord.js";
import { commands } from "../commands";
import GameService from "../services/GameService";
import state from "../store/state";
import { STATE } from "../helpers/constants";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(commands);

        console.log(`${client.user.username} is online`);

        console.log("Loading card attributes...");
        
        const gameService = new GameService();

        const { data: cardAttributesData } = await gameService.loadCardAttributes();

        await state.set(STATE.LOADED_CARDS, cardAttributesData);
    });
};
