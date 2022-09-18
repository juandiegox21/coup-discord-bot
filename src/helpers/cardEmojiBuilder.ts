import { cardEmoji } from "../types/coup";

const generateCardEmoji = (emojis: Array<string>): cardEmoji => {
    const [
        topLeft,
        topRight,
        midLeft,
        midRight,
        bottomLeft,
        bottomRight,
    ] = emojis;

    return {
        top: topLeft + topRight,
        mid: midLeft + midRight,
        bottom: bottomLeft + bottomRight,
    };
};

export default generateCardEmoji;
