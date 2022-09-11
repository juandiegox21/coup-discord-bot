import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import GameService from "../services/GameService";
import state from "../store/state";

export const deleteGame: Command = {
    name: "deletegame",
    description: "Deletes current game",
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

        const { data } = await gameService.deleteGame(currentGameId);

        if (data.error) {
            return interaction.followUp({
                ephemeral: true,
                content: data.error
            });
        }

        await state.delete(STATE.CURRENT_GAME_ID);

        const content = `:x: Game with ID ${data.id} has ended`;

        await interaction.followUp({
            content
        });
    }
};
