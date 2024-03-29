import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import GameService from "../services/GameService";
import state from "../store/state";

export const startGame: Command = {
    name: "startgame",
    description: "Starts the match",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const gameService = new GameService();


        const currentGameId = await state.get(STATE.CURRENT_GAME_ID);

        if (!currentGameId) {
            return interaction.followUp({
                ephemeral: true,
                content: "There are no games active right now."
            });
        }

        const { data } = await gameService.startGame(currentGameId);

        if (data.error) {
            return interaction.followUp({
                ephemeral: true,
                content: data.error
            });
        }

        const content = ':confetti_ball: A NEW MATCH  HAS STARTED!';

        await interaction.followUp({
            content
        });
    }
};
