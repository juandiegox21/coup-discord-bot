import dotenv from "dotenv";
import Keyv from "keyv";

dotenv.config();

const sqlitePath = process.env['SQLITE_PATH'];
const state = new Keyv(`sqlite://${sqlitePath}`);

export default state;
