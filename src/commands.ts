import { Command } from "./command";
import { createGame } from "./commands/createGame";
import { ping } from "./commands/ping";

export const commands: Command[] = [
    ping,
    createGame,
];
