const STATE = {
    BOT_CHANNEL_ID: 'bot_channel_id',
    CURRENT_GAME_ID: 'current_game_id',
    LOADED_CARDS: 'loaded_cards',
    PLAYERS_CARDS: 'players_cards',
    HAS_GAME_STARTED: 'has_game_started',
    GAME_PLAYERS: 'game_players',
    PLAYER_TURN_DISCORD_ID: 'player_turn_discord_id',
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

const AMBASSADOR_CARD_EMOJIS: Array<string> = [
    "<:ambassador1:1017242081724477450>",
    "<:ambassador2:1017242080436813874>",
    "<:ambassador3:1017242079430189086>",
    "<:ambassador4:1017242078339661877>",
    "<:ambassador5:1017242077790220398>",
    "<:ambassador6:1017242077093961848>",
];

const DUKE_CARD_EMOJIS: Array<string> = [
    "<:duke1:1021146697369391124>",
    "<:duke2:1021146696585056286>",
    "<:duke3:1021146695679086613>",
    "<:duke4:1021146694739562598>",
    "<:duke5:1021146693774868590>",
    "<:duke6:1021146692965388298>",
];

const CAPTAIN_CARD_EMOJIS: Array<string> = [
    "<:captain1:1021146746082046072>",
    "<:captain2:1021146745079615568>",
    "<:captain3:1021146743821304019>",
    "<:captain4:1021146742751776849>",
    "<:captain5:1021146741652852736>",
    "<:captain6:1021146740700762162>",
];

const ASSASSIN_CARD_EMOJIS: Array<string> = [
    "<:assassin1:1021146795675496459>",
    "<:assassin2:1021146795042160771>",
    "<:assassin3:1021146794090057768>",
    "<:assassin4:1021146793305706496>",
    "<:assassin5:1021146792093548565>",
    "<:assassin6:1021146791372128358>",
];

const WHITESPACES = "      ";

const EMOJIS = {
    BACK_OF_CARD_EMOJIS,
    CONTESSA_CARD_EMOJIS,
    AMBASSADOR_CARD_EMOJIS,
    DUKE_CARD_EMOJIS,
    CAPTAIN_CARD_EMOJIS,
    ASSASSIN_CARD_EMOJIS,
    WHITESPACES
};

const CARD_NAMES_TO_EMOJIS = {
    'Contessa': CONTESSA_CARD_EMOJIS,
    'Ambassador': AMBASSADOR_CARD_EMOJIS,
    'Duke': DUKE_CARD_EMOJIS,
    'Assassin': ASSASSIN_CARD_EMOJIS,
    'Captain': CAPTAIN_CARD_EMOJIS,
};

const FULL_CARD_EMOJIS_ID = {
    duke: '1177756488014508113',
    captain: '1177756490157797527',
    assassin: '1177756491344773120',
    ambassador: '1177756492535975936',
    contessa: '1177756488933048361'
}

const BUTTON_INTERACTION_IDS = {
    GET_CARDS_BUTTON_ID: 'getCardsButtonId',
    INCOME_BUTTON_ID: 'incomeButtonId',
    FOREIGN_AID_BUTTON_ID: 'foreignAidButtonId',
    COUP_BUTTON_ID: 'coupButtonId',
    DUKE_ACTION_BUTTON_ID: 'dukeActionButtonId',
    CAPTAIN_ACTION_BUTTON_ID: 'captainActionButtonId',
    ASSASSIN_ACTION_BUTTON_ID: 'assassinActionButtonId',
    AMBASSADOR_ACTION_BUTTON_ID: 'ambassadorActionButtonId'
};

export {
    STATE,
    EMOJIS,
    CARD_NAMES_TO_EMOJIS,
    FULL_CARD_EMOJIS_ID,
    BUTTON_INTERACTION_IDS
}
