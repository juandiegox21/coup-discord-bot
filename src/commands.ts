import { Command } from "./command";
import { ping } from "./commands/ping";
import { inviteCoupToChannel } from "./commands/inviteCoupToChannel";
import { createGame } from "./commands/createGame";
import { deleteGame } from "./commands/deleteGame";
import { joinGame } from "./commands/joinGame";

export const commands: Command[] = [
    ping,
    inviteCoupToChannel,
    createGame,
    deleteGame,
    joinGame,
];
