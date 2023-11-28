import { CommandInteraction, Client, Interaction, InteractionType, ButtonInteraction } from "discord.js";
import { commands } from "../commands";
import { inviteCoupToChannel } from "../commands/inviteCoupToChannel";
import { BUTTON_ACTIONS_INTERACTION_IDS, STATE } from "../helpers/constants";
import state from "../store/state";
import replyWithUserCards from "../replies/replyWithUserCards";
import { isPlayersTurn } from "../helpers/utils";
import replyToActions from "../replies/replyToActions";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.type === InteractionType.ApplicationCommand) {
            const commandInteraction = interaction as CommandInteraction;
            await handleSlashCommand(client, commandInteraction);
        }

        else if (interaction.isButton()) {
            await handleButtonInteraction(interaction as ButtonInteraction);
        }
    });
};

const isCommandToAssignBot = (commandName: string) => commandName === inviteCoupToChannel.name;

const channelExists = async (client: Client): Promise<boolean> => {
    const currentChannelId = await state.get(STATE.BOT_CHANNEL_ID);

    return client.channels.cache.has(currentChannelId);
};

const handleButtonInteraction = async (interaction: ButtonInteraction) => {
    if (interaction.customId === BUTTON_ACTIONS_INTERACTION_IDS.GET_CARDS_BUTTON_ID) {
        await replyWithUserCards(interaction);
        return;
    }

    if (interaction.customId.startsWith('action')) {
        if (!await isPlayersTurn(interaction.user.id)) {
            await interaction.deferUpdate();
            return;
        }

        await replyToActions(interaction);
        return;
    }
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = commands.find(c => c.name === interaction.commandName);

    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    try {
        if (!isCommandToAssignBot(interaction.commandName)) {
            const isChannelValid = await channelExists(client);

            if (!isChannelValid) {
                interaction.followUp({ content: ":red_circle: COUP is not in a valid text channel, go into a VALID text channel and type /invitecoup" });
                return;
            }
        }

        slashCommand.run(client, interaction);
    } catch (error) {
        console.error('Error handling slash command:', error);
        await interaction.followUp({ content: "An unexpected error occurred", ephemeral: true });
    }
};
