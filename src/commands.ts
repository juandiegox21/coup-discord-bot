import { Command } from "./command";
import { ping } from "./commands/ping";
import { inviteCoupToChannel } from "./commands/inviteCoupToChannel";
import { createGame } from "./commands/createGame";
import { deleteGame } from "./commands/deleteGame";

export const commands: Command[] = [
    ping,
    inviteCoupToChannel,
    createGame,
    deleteGame,
];
