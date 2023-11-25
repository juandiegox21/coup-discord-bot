import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import GamePlayerService from "../services/GamePlayerService";
import state from "../store/state";

export const joinGame: Command = {
    name: "join",
    description: "Join to current game",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.deferReply();

        const currentGameId = await state.get(STATE.CURRENT_GAME_ID);

        if (!currentGameId) {
            return interaction.followUp({
                content: "There are no games active right now."
            });
        }

        const { id, username } = interaction.user;

        const gamePlayerService = new GamePlayerService(currentGameId);

        const playerData = {
            name: username,
            discordId: id,
            coins: 2
        };

        const { data } = await gamePlayerService.createPlayerGame(playerData);

        if (data.error) {
            return interaction.followUp({
                content: data.error
            });
        }

        const content = `:person_raising_hand: ${username} has joined the game!`;

        await interaction.followUp({
            content
        });
    }
};
