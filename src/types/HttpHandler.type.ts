export type HttpHandlerErrorResponse = {
    id?: never;
    error: string;
};

export type HttpHandlerSuccessResponse = {
    id: number;
    error?: never;
};

export type HttpHandlerResponse = {
    data: HttpHandlerErrorResponse | HttpHandlerSuccessResponse
};

export type GamePlayerData = {
    name: string;
    discordId: string;
    coins: number;
};
