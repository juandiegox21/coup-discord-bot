import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import GameService from "../services/GameService";
import state from "../store/state";

export const createGame: Command = {
    name: "creategame",
    description: "Creates a new game",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.deferReply();

        const gameService = new GameService();
        const { data } = await gameService.createGame();

        if (data.error) {
            return interaction.followUp({
                content: data.error
            });
        }

        const gameId = data.id;
        await state.set(STATE.CURRENT_GAME_ID, gameId);

        const content = ':loudspeaker: A new game has started! /join';

        await interaction.followUp({
            content
        });
    }
};
