export type cardEmoji = {
    top: string,
    mid: string,
    bottom: string
};

type cardActionAttribute = {
    id: number,
    canTax: boolean,
    canAssassinate: boolean,
    canSteal: boolean,
    canExchange: boolean,
}

type cardCounterActionAttribute = {
    id: number,
    canBlockForeignAid: boolean,
    canBlockStealing: boolean,
    canBlockAssassination: boolean
}

export type card = {
    id: number,
    name: string,
    cardActionAttribute: cardActionAttribute,
    cardCounterActionAttribute: cardCounterActionAttribute,
};

export type gameCard = {
    gameId: number,
    cardId: number,
    gamePlayerId: number | null,
    gamePlayerDiscordId: string | null
};