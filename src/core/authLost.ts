import {appRouter} from "./Router";
import {appStore} from "./Store";


export const authLost = () => {
    appStore.set({user: null, chats: [], chat: null});
    appRouter.go("/");
};
