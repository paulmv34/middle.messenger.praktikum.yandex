import {authLost} from "./authLost";
import {showError} from "./showError";
import {HTTPError} from "./CustomError";

export const isAlreadyAuthError = (error: Error | HTTPError) => {
    if ((error instanceof HTTPError)) {
        if (error.status && error.status == 400 && error.message === "User already in system") {
            return true;
        }
    }
    return false;
};

export const isAuthError = (error: Error | HTTPError) => {
    if ((error instanceof HTTPError)) {
        if (error.status && error.status == 401) {
            return true;
        }
    }
    return false;
};

export const processHTTPError = (error: Error | HTTPError) => {
    if ((error instanceof HTTPError)) {
        if (error.status && error.status == 401) {
            authLost();
            return;
        }
        else
            console.warn(error.message);
    }
    else
        console.warn(error);
    showError();
};
