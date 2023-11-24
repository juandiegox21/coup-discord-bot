import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import GamePlayerService from "../services/GamePlayerService";
import state from "../store/state";

export const leaveGame: Command = {
    name: "leave",
    description: "Leave current game",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const currentGameId = await state.get(STATE.CURRENT_GAME_ID);

        if (!currentGameId) {
            return interaction.followUp({
                ephemeral: true,
                content: "There are no games active right now."
            });
        }

        const { id, username } = interaction.user;

        const gamePlayerService = new GamePlayerService(currentGameId);

        const { data } = await gamePlayerService.deletePlayerGame(id);

        if (data.error) {
            return interaction.followUp({
                ephemeral: true,
                content: data.error
            });
        }

        const content = `:person_bowing: ${username} has left the game!`;

        await interaction.followUp({
            content
        });
    }
};
