import dotenv from "dotenv";

dotenv.config();

export default {
    ambassador: process.env['AMBASSADOR_CARD_URL'],
    assassin: process.env['ASSASSIN_CARD_URL'],
    captain: process.env['CAPTAIN_CARD_URL'],
    contessa: process.env['CONTESSA_CARD_URL'],
    duke: process.env['DUKE_CARD_URL'],
}
