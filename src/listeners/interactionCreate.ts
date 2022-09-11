import { BaseCommandInteraction, Client, Interaction } from "discord.js";
import { commands } from "../commands";
import { assignBotChannel } from "../commands/assignBotChannel";
import { STATE } from "../helpers/constants";
import state from "../store/state";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const isCommandToAssignBot = (commandName: string) => commandName === assignBotChannel.name;
const isBotAssignedtoChannel = async (): Promise<boolean> => await state.get(STATE.BOT_CHANNEL_ID) ? true : false;

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const slashCommand = commands.find(c => c.name === interaction.commandName);

    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    const isAssignedToChannel = await isBotAssignedtoChannel();

    await interaction.deferReply();

    if (!isCommandToAssignBot(interaction.commandName) && !isAssignedToChannel) {
        interaction.followUp({ content: "COUP bot needs to be assigned to a channel /assignbotchannel {CHANNEL_ID}" });
    } else {
        slashCommand.run(client, interaction);
    }
};
