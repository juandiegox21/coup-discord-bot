import { BaseCommandInteraction, Client, Interaction } from "discord.js";
import { commands } from "../commands";
import { inviteCoupToChannel } from "../commands/inviteCoupToChannel";
import { STATE } from "../helpers/constants";
import state from "../store/state";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const isCommandToAssignBot = (commandName: string) => commandName === inviteCoupToChannel.name;

const channelExists = async (client: Client): Promise<boolean> => {
    const currentChannelId = await state.get(STATE.BOT_CHANNEL_ID);

    return client.channels.cache.has(currentChannelId);
};

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const slashCommand = commands.find(c => c.name === interaction.commandName);

    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();

    if (!isCommandToAssignBot(interaction.commandName)) {
        const isChannelValid = await channelExists(client);

        if (!isChannelValid) {
            interaction.followUp({ content: ":red_circle: COUP is not in a valid text channel, go into a VALID text channel and type /invitecoup" });
            return;
        }
    }

    slashCommand.run(client, interaction);
};
