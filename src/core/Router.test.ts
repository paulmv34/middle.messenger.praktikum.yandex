import { expect, assert } from "chai";

import Block from "./Block";
import {Router} from "./Router";
import {appStore} from "./Store";

describe("Router", () => {
    let appRouter: Router;
    let authPage: typeof Block;
    let messengerPage: typeof Block;
    let errorPage: typeof Block;
    let messageOnRouteCallback: (data: Record<string, string>) => boolean;
    const defaultStoreUser = {user: {
        id: 1,
        login: "i_am_root",
        firstName: "i_am_root",
        secondName: "i_am_root",
        displayName: "i_am_root",
        avatar: "",
        phone: "111111",
        email: "i@am.root",
    }
    };

    beforeEach(() => {
        const mainDiv = document.createElement("div");
        mainDiv.setAttribute("id", "app");
        document.body.innerHTML = "";
        document.body.append(mainDiv);

        class AuthPage {
            static authRequired = "no";
            getElement() {
                const div = document.createElement("div");

                div.setAttribute("id", "auth");

                return div;
            }
            destroy() {}
        }

        class MessengerPage {
            static authRequired = "yes";
            getElement() {
                const div = document.createElement("div");

                div.setAttribute("id", "messenger");

                return div;
            }
            destroy() {}
        }

        class ErrorPage {
            static authRequired = "any";
            getElement() {
                const div = document.createElement("div");

                div.setAttribute("id", "error");

                return div;
            }
            destroy() {}
        }

        authPage = AuthPage as unknown as typeof Block;
        messengerPage = MessengerPage as unknown as typeof Block;
        errorPage = ErrorPage as unknown as typeof Block;
        messageOnRouteCallback = () => true;

        appRouter = new Router("#app");
        appRouter.use({
            pathname: "/",
            block: authPage,
            asStartRoute: true
        });
        appRouter.use({
            pathname: /\/messenger\/(:?(?<chatId>\d*)\/)?$/,
            block: messengerPage,
            onRoute: (data) => messageOnRouteCallback(data)
        });
        appRouter.use({
            pathname: "/error/",
            block: errorPage,
            asErrorRoute: true,
        });
    });

    it("User not authorized. Going to the start page. Start page shown.", () => {
        appRouter.start();
        appRouter.go("/");

        expect(document.getElementById("auth")).not.to.be.null;
    });

    it("User not authorized. Going to a page that requires authorization. URL not changed.", () => {
        appRouter.start();
        appRouter.go("/messenger/");

        assert.strictEqual(window.location.pathname, "/messenger/");
    });

    it("User not authorized. Going to a page that requires authorization. Login form shown.", () => {
        appRouter.start();
        appRouter.go("/messenger/");

        expect(document.getElementById("auth")).not.to.be.null;
    });

    it("User authorized. Going to a page that requires authorization. Requested page shown.", () => {
        appStore.set(defaultStoreUser);

        appRouter.start();
        appRouter.go("/messenger/");

        expect(document.getElementById("messenger")).not.to.be.null;
    });

    it("Going to page with an parameters in path. Requested parameters received.", () => {
        appStore.set(defaultStoreUser);

        messageOnRouteCallback = function (data) {
            assert.ok(data.chatId === "134");
            return true;
        };

        appRouter.start();
        appRouter.go("/messenger/134/");
    });

    it("Going to page with an incorrect parameters in path. An error page is shown. (requested a number, received a string).", () => {
        appStore.set(defaultStoreUser);

        appRouter.start();
        appRouter.go("/messenger/134d/");

        expect(document.getElementById("error")).not.to.be.null;
    });

    it("An error page is shown when navigating to a non-existent page.", () => {
        appRouter.start();
        appRouter.go("/messenge/");

        expect(document.getElementById("error")).not.to.be.null;
    });

    it("Onroute aborted navigation to the requested page. Error page displayed.", () => {
        messageOnRouteCallback = function () {
            return false;
        };

        appRouter.start();
        appRouter.go("/messenger/");

        expect(document.getElementById("error")).not.to.be.null;
    });
});
