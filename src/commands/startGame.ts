import { CommandInteraction, Client, ApplicationCommandType} from "discord.js";
import { Command } from "../command";
import { STATE } from "../helpers/constants";
import GameService from "../services/GameService";
import state from "../store/state";
import { getPlayersFromGame, nextPlayerTurn, sendPlayerTurnMessage } from "../helpers/utils";

export const startGame: Command = {
    name: "startgame",
    description: "Starts the match",
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

        const { data } = await gameService.startGame(currentGameId);

        if (data.error) {
            return interaction.followUp({
                content: data.error
            });
        }

        await state.set(STATE.PLAYERS_CARDS, data);
        await state.set(STATE.HAS_GAME_STARTED, true);

        const gamePlayers = await getPlayersFromGame(currentGameId);
        await state.set(STATE.GAME_PLAYERS, gamePlayers);

        const content = ':confetti_ball: A NEW MATCH  HAS STARTED!';

        await interaction.followUp({
            content
        });

        const playerTurn = await nextPlayerTurn();
        await sendPlayerTurnMessage(interaction, playerTurn);
    }
};
