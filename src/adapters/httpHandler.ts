import { AxiosError, AxiosResponse } from "axios";

const handleHttpErrorMessage = (error: unknown, defaultMessage: string): string => {
    console.log(error);

    if (error instanceof AxiosError) {
        const { status, data } = error.response as AxiosResponse;

        if (status !== 422 && data) {
            return defaultMessage;
        }

        return data.error;
    }

    return "AN UNKOWN ERROR OCCURRED";
}

export {
    handleHttpErrorMessage
}
