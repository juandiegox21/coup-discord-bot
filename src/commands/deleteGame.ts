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
        await interaction.deferReply();

        const gameService = new GameService();
        const currentGameId = await state.get(STATE.CURRENT_GAME_ID);

        if (!currentGameId) {
            return interaction.followUp({
                content: "There are no games active right now."
            });
        }

        const { data } = await gameService.softDeleteGame(currentGameId);

        if (data.error) {
            return interaction.followUp({
                content: data.error
            });
        }

        const gameId = await state.get(STATE.CURRENT_GAME_ID);

        const content = `:x: Game with ID ${gameId} has ended`;

        await state.set(STATE.HAS_GAME_STARTED, false);
        await state.delete(STATE.CURRENT_GAME_ID);
        await state.delete(STATE.PLAYERS_CARDS);
        await state.delete(STATE.GAME_PLAYERS);
        await state.delete(STATE.PLAYER_TURN_DISCORD_ID);

        await interaction.followUp({
            content
        });
    }
};
