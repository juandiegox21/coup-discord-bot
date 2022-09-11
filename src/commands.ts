import { Command } from "./command";
import { assignBotChannel } from "./commands/assignBotChannel";
import { createGame } from "./commands/createGame";
import { ping } from "./commands/ping";

export const commands: Command[] = [
    ping,
    createGame,
    assignBotChannel
];
