import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import GameService from "../services/GameService";
import state from "../store/state";

export const endGame: Command = {
    name: "endgame",
    description: "Ends current game",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const gameService = new GameService();

        const currentGameId = await state.get(STATE.CURRENT_GAME_ID);

        if (!currentGameId) {
            return interaction.followUp({
                ephemeral: true,
                content: "There are no games active right now."
            });
        }

        const { data } = await gameService.softDeleteGame(currentGameId);

        if (data.error) {
            return interaction.followUp({
                ephemeral: true,
                content: data.error
            });
        }

        await state.delete(STATE.CURRENT_GAME_ID);
        await state.delete(STATE.PLAYERS_CARDS);


        const content = `:x: Game with ID ${data.id} has ended`;

        await interaction.followUp({
            content
        });
    }
};
