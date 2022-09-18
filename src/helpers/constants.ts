const STATE = {
    BOT_CHANNEL_ID: 'bot_channel_id',
    CURRENT_GAME_ID: 'current_game_id'
};

const BACK_OF_CARD_EMOJIS: Array<string> = [
    "<:backofcard1:1018632143544537243>",
    "<:backofcard2:1018632142558867496>",
    "<:backofcard3:1018632141564813444>",
    "<:backofcard4:1018632140558184480>",
    "<:backofcard5:1018632139668983818>",
    "<:backofcard6:1018632138792382565>",
];

const CONTESSA_CARD_EMOJIS: Array<string> = [
    "<:contessa1:1017241123028226078>",
    "<:contessa2:1017241121979641957>",
    "<:contessa3:1017241120465498144>",
    "<:contessa4:1017241118976528497>",
    "<:contessa5:1017241118582263818>",
    "<:contessa6:1017241117307179008>",
];

const WHITESPACES = "      ";

const EMOJIS = {
    BACK_OF_CARD_EMOJIS,
    CONTESSA_CARD_EMOJIS,
    WHITESPACES
};

export {
    STATE,
    EMOJIS,
}
