import { CommandInteraction, Client, Interaction, InteractionType, ButtonInteraction } from "discord.js";
import { commands } from "../commands";
import { inviteCoupToChannel } from "../commands/inviteCoupToChannel";
import { BUTTON_INTERACTION_IDS, STATE } from "../helpers/constants";
import state from "../store/state";
import replyWithUserCards from "../replies/replyWithUserCards";
import { formatUserMention } from "../helpers/utils";

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
    switch (interaction.customId) {
        case BUTTON_INTERACTION_IDS.GET_CARDS_BUTTON_ID:
            replyWithUserCards(interaction)
            break;
        case BUTTON_INTERACTION_IDS.INCOME_BUTTON_ID:
            await interaction.reply({ 
                content: `${formatUserMention(interaction.user.id)} has chosen Income!`
            });
            break;
        case BUTTON_INTERACTION_IDS.FOREIGN_AID_BUTTON_ID:
            await interaction.reply({ 
                content: `${formatUserMention(interaction.user.id)} has chosen Foreign Aid!`
            });
            break;
        case BUTTON_INTERACTION_IDS.COUP_BUTTON_ID:
            await interaction.reply({ 
                content: `${formatUserMention(interaction.user.id)} has chosen Coup!`
            });
            break;
        case BUTTON_INTERACTION_IDS.DUKE_ACTION_BUTTON_ID:
            await interaction.reply({ 
                content: `${formatUserMention(interaction.user.id)} has chosen Duke!`
            });
            break;
        case BUTTON_INTERACTION_IDS.CAPTAIN_ACTION_BUTTON_ID:
            await interaction.reply({ 
                content: `${formatUserMention(interaction.user.id)} has chosen Captain!`
            });
            break;
        case BUTTON_INTERACTION_IDS.ASSASSIN_ACTION_BUTTON_ID:
            await interaction.reply({ 
                content: `${formatUserMention(interaction.user.id)} has chosen Assassin!`
            });
            break;
        case BUTTON_INTERACTION_IDS.AMBASSADOR_ACTION_BUTTON_ID:
            await interaction.reply({ 
                content: `${formatUserMention(interaction.user.id)} has chosen Ambassador!`
            });
            break;
        default:
            break;
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
