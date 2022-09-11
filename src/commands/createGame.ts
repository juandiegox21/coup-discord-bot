import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import GameService from "../services/GameService";
import state from "../store/state";

export const createGame: Command = {
    name: "creategame",
    description: "Creates a new game",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const gameService = new GameService();

        const { data } = await gameService.createGame();

        if (data.error) {
            return interaction.followUp({
                ephemeral: true,
                content: data.error
            });
        }

        const gameId = data.id;
        await state.set(STATE.CURRENT_GAME_ID, gameId);

        const content = `Game has been created with ID: ${gameId}`;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
