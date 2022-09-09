import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseURL = process.env['API_URL'];

const AxiosAdapter = axios.create({
    baseURL
});

export default AxiosAdapter;
