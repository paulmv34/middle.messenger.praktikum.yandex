import "./style/main.scss";
import * as Components from "./components";
import {registerComponent} from "./core/registerComponent";
import {PageTypes, Props, RefType} from "./types/types";
import {appStore} from "./core/Store";
import {appRouter} from "./core/Router";
import {AuthorizationPage, RegistrationPage, ChatPage, ErrorPage, ProfilePage, ProfileEditPage, PasswordEditPage} from "./pages";
import {getUser} from "./services/auth";
import {getChats} from "./services/chat";
import Block from "./core/Block";
import {Error404AuthorizedContext, Error404Context} from "./main.data";
import {processHTTPError} from "./core/processHTTPError";
import {cloneDeep} from "./utils/cloneDeep";
import {ErrorInfo} from "./core/showError";

declare global {
    type Nullable<T> = T | null;
}

const startApp = async () => {
    getUser().then(
        (me) => {
            appStore.set({user: me});
            getChats().then(chats => {
                appStore.set({chats});
                appRouter.go(document.location.pathname !== "/" ? document.location.pathname : "/messenger/");
            }).catch(error => {
                processHTTPError(error);
            });

        }
    ).catch(
        () => {
            appRouter.go(document.location.pathname !== "/" ? document.location.pathname : "/");
        }
    );
};

Object.entries(Components).forEach(([ name, component ]) => {
    registerComponent(name, component as typeof Block<Props, RefType>);
});

appRouter
    .use({
        pathname: "/",
        block: AuthorizationPage,
        asStartRoute: true
    })
    .use({
        pathname: "/sign-up/",
        block: RegistrationPage,
    })
    .use({
        pathname: "/error/",
        block: ErrorPage,
        asErrorRoute: true,
        onRoute: () => {
            const state = appStore.getState();
            if (!state.errorInfo || Object.values(state.errorInfo).length == 0) {
                const baseErrorProps = cloneDeep(state.user ? Error404AuthorizedContext : Error404Context);
                appStore.set({errorInfo: baseErrorProps as ErrorInfo});
            }
            return true;
        },
        onLeave: () => {
            appStore.set({errorInfo: {}});
        }
    })
    .use({
        pathname: "/settings/",
        block: ProfilePage,
    })
    .use({
        pathname: "/settings/edit/",
        block: ProfileEditPage,
    })
    .use({
        pathname: "/settings/password/",
        block: PasswordEditPage,
    })
    .use({
        pathname: /\/messenger\/(:?(?<chatId>\d*)\/)?$/,
        block: ChatPage,
        onRoute: (data) => {
            let hasError = false;
            const state = appStore.getState();
            const chatId = data.chatId ? parseInt(data.chatId) : 0;
            let activeChat = null;
            if (chatId && state.chats) {
                state.chats?.forEach(chat => {
                    if (chat.id === chatId)
                        activeChat = chat;
                });
            }
            if (!activeChat && chatId) {
                appStore.set({errorInfo: Error404AuthorizedContext});
                hasError = true;
            }
            appStore.set({chat: activeChat});
            return !hasError;
        }
    })
    .start(
        () => startApp()
    );


document.addEventListener("click", (e:MouseEvent) => {
    const closestDataPage = e.target instanceof Element ? e.target.closest("[data-page]") : undefined;
    if (!closestDataPage)
        return;
    const page = <PageTypes>closestDataPage.getAttribute("data-page");
    if (page) {
        e.preventDefault();
        e.stopImmediatePropagation();
        appRouter.go(page);
    }
});
