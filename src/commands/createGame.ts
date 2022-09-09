import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";
import GameService from "../services/GameService";
import { AxiosError, AxiosResponse } from "axios";

export const createGame: Command = {
    name: "creategame",
    description: "Creates a new game",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const gameService = new GameService();

        const content = await gameService.createGame();

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
