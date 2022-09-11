import { AxiosError, AxiosResponse } from "axios";
import { HttpHandlerResponse } from "../types/HttpHandler.type";

const handleHttpError = (error: unknown, defaultMessage: string): HttpHandlerResponse => {
    if (error instanceof AxiosError) {
        const { status, data } = error.response as AxiosResponse;

        if (status !== 422) {
            return {
                data: {
                    error: defaultMessage
                }
            };
        }

        return {
            data
        };
    }

    console.log(error);

    return {
        data: {
            error: "AN UNKOWN ERROR OCCURRED"
        }
    };
}

export {
    handleHttpError
}
