import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { BUTTON_INTERACTION_IDS, FULL_CARD_EMOJIS_ID } from "../helpers/constants";

export default function() {
    // first row
    const cardsButton = new ButtonBuilder()
        .setCustomId(BUTTON_INTERACTION_IDS.GET_CARDS_BUTTON_ID)
        .setEmoji('🃏')
        .setLabel('My Cards')
        .setStyle(ButtonStyle.Secondary);

    const incomeButton = new ButtonBuilder()
        .setCustomId(BUTTON_INTERACTION_IDS.INCOME_BUTTON_ID)
        .setEmoji('🪙')
        .setLabel('Income')
        .setStyle(ButtonStyle.Secondary);

    const foreignAidButton = new ButtonBuilder()
        .setCustomId(BUTTON_INTERACTION_IDS.FOREIGN_AID_BUTTON_ID)
        .setEmoji('🫴')
        .setLabel('Foreign Aid')
        .setStyle(ButtonStyle.Secondary);

    const coupButton = new ButtonBuilder()
        .setCustomId(BUTTON_INTERACTION_IDS.COUP_BUTTON_ID)
        .setEmoji('🗡️')
        .setLabel('Coup')
        .setStyle(ButtonStyle.Danger);

    // second row
    const dukeButton = new ButtonBuilder()
        .setCustomId(BUTTON_INTERACTION_IDS.DUKE_ACTION_BUTTON_ID)
        .setEmoji(FULL_CARD_EMOJIS_ID.duke)
        .setLabel('Take 3 coins')
        .setStyle(ButtonStyle.Primary);

    const captainButton = new ButtonBuilder()
        .setCustomId(BUTTON_INTERACTION_IDS.CAPTAIN_ACTION_BUTTON_ID)
        .setEmoji(FULL_CARD_EMOJIS_ID.captain)
        .setLabel('Steal 2 coins')
        .setStyle(ButtonStyle.Primary);

    const assassinButton = new ButtonBuilder()
        .setCustomId(BUTTON_INTERACTION_IDS.ASSASSIN_ACTION_BUTTON_ID)
        .setEmoji(FULL_CARD_EMOJIS_ID.assassin)
        .setLabel('Assassinate')
        .setStyle(ButtonStyle.Primary);

    const ambassadorButton = new ButtonBuilder()
        .setCustomId(BUTTON_INTERACTION_IDS.AMBASSADOR_ACTION_BUTTON_ID)
        .setEmoji(FULL_CARD_EMOJIS_ID.ambassador)
        .setLabel('Exchange')
        .setStyle(ButtonStyle.Primary);

    const firstRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
        cardsButton,
        incomeButton, 
        foreignAidButton,
        coupButton,
    ]);

    const secondRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
        dukeButton,
        captainButton,
        assassinButton,
        ambassadorButton,
    ]);
    
    return [
        firstRow,
        secondRow
    ];
}
