import {appRouter} from "./Router";
import {appStore} from "./Store";
import {cloneDeep} from "../utils/cloneDeep";
import {Error404AuthorizedContext, Error404Context, Error500AuthorizedContext, Error500Context} from "../main.data";

export type ErrorInfo = {
    status?: number,
    caption?: string,
    title?: string,
    text?: string,
    backPage?: string,
    label?: string,
}

export const showError = (errorInfo: ErrorInfo = {}) => {
    const state = appStore.getState();
    let baseErrorProps;
    if (errorInfo.status === 404) {
        baseErrorProps = cloneDeep(state.user ? Error404AuthorizedContext : Error404Context);
    }
    else {
        baseErrorProps = cloneDeep(state.user ? Error500AuthorizedContext : Error500Context);
    }

    baseErrorProps = Object.assign(baseErrorProps, errorInfo);

    appStore.set({
        errorInfo: baseErrorProps as ErrorInfo
    });
    appRouter.showError();
};
