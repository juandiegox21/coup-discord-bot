import { Command } from "./command";
import { inviteCoupToChannel } from "./commands/inviteCoupToChannel";
import { createGame } from "./commands/createGame";
import { ping } from "./commands/ping";

export const commands: Command[] = [
    ping,
    createGame,
    inviteCoupToChannel,
];
