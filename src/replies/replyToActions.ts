import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { BUTTON_ACTIONS_INTERACTION_IDS } from "../helpers/constants";
import { formatUserMention, nextPlayerTurn, sendPlayerTurnMessage } from "../helpers/utils";

const incomeButtonReply = async (interaction: ButtonInteraction) => {
    await interaction.reply({ 
        content: `${formatUserMention(interaction.user.id)} has chosen Income!`
    });
};

const foreignAidButtonReply = async (interaction: ButtonInteraction) => {
    await interaction.reply({ 
        content: `${formatUserMention(interaction.user.id)} has chosen Foreign Aid!`
    });
};

const coupButtonReply = async (interaction: ButtonInteraction) => {
    await interaction.reply({ 
        content: `${formatUserMention(interaction.user.id)} has chosen Coup!`
    });
};

const dukeButtonReply = async (interaction: ButtonInteraction) => {
    await interaction.reply({ 
        content: `${formatUserMention(interaction.user.id)} has chosen Duke!`
    });
};

const captainButtonReply = async (interaction: ButtonInteraction) => {
    await interaction.reply({ 
        content: `${formatUserMention(interaction.user.id)} has chosen Captain!`
    });
};

const assassinButtonReply = async (interaction: ButtonInteraction) => {
    await interaction.reply({ 
        content: `${formatUserMention(interaction.user.id)} has chosen Assassin!`
    });
};

const ambassadorButtonReply = async (interaction: ButtonInteraction) => {
    await interaction.reply({ 
        content: `${formatUserMention(interaction.user.id)} has chosen Ambassador!`
    });
};

export default async function(interaction: ButtonInteraction) {    
    switch (interaction.customId) {
        case BUTTON_ACTIONS_INTERACTION_IDS.INCOME_BUTTON_ID:
            await incomeButtonReply(interaction);
            break;
        case BUTTON_ACTIONS_INTERACTION_IDS.FOREIGN_AID_BUTTON_ID:
            await foreignAidButtonReply(interaction);
            break;
        case BUTTON_ACTIONS_INTERACTION_IDS.COUP_BUTTON_ID:
            await coupButtonReply(interaction);
            break;
        case BUTTON_ACTIONS_INTERACTION_IDS.DUKE_ACTION_BUTTON_ID:
            await dukeButtonReply(interaction);
            break;
        case BUTTON_ACTIONS_INTERACTION_IDS.CAPTAIN_ACTION_BUTTON_ID:
            await captainButtonReply(interaction);
            break;
        case BUTTON_ACTIONS_INTERACTION_IDS.ASSASSIN_ACTION_BUTTON_ID:
            await assassinButtonReply(interaction);
            break;
        case BUTTON_ACTIONS_INTERACTION_IDS.AMBASSADOR_ACTION_BUTTON_ID:
            await ambassadorButtonReply(interaction);
            break;
        default:
            break;
    }

    const playerTurn = await nextPlayerTurn();
    await sendPlayerTurnMessage(interaction, playerTurn);
}
