import "./style/main.scss";
import "./types/main.types";
import Block from "./core/Block";
import * as Components from "./components";
import {registerComponent} from "./core/registerComponent";
import * as Pages from "./pages";
import * as Contexts from "./main.data";
import { PageTypes, BlockProps } from "./types/main.types";

const pages:{[key: string]: [object, object]} = {
    "authorization": [ Pages.AuthorizationPage, Contexts.AuthorizationPageContext],
    "registration": [ Pages.RegistrationPage, Contexts.RegistrationPageContext],
    "404": [ Pages.ErrorPage, Contexts.Error404PageContext],
    "500": [ Pages.ErrorPage, Contexts.Error500PageContext],
    "empty-chat": [ Pages.ChatPage, Contexts.EmptyChatPageContext],
    "chat": [ Pages.ChatPage, Contexts.ChatPageContext],
    "profile": [ Pages.ProfilePage, Contexts.ProfilePageContext],
    "profileEdit": [ Pages.ProfileEditPage, Contexts.ProfileEditPageContext],
    "passwordEdit": [ Pages.PasswordEditPage, Contexts.PasswordEditPageContext],
};

Object.entries(Components).forEach(([ name, component ]) => {
    registerComponent(name, component);
});

function navigate(page: PageTypes) {
    const [ PageComponent, context ]: [typeof Block, BlockProps] = pages[page] as [typeof Block, BlockProps];
    const container = document.getElementById("app");
    if (context.title)
        document.title = <string>context.title;
    const pageComponent = new PageComponent(context);
    const element = pageComponent.getElement();
    if (container && element) {
        if (container.childNodes.length > 0)
            container.replaceChildren(element);
        else
            container.append(element);
    }
}

document.addEventListener("DOMContentLoaded", () => navigate("authorization"));

document.addEventListener("click", (e:MouseEvent) => {
    const closestDataPage = e.target instanceof Element ? e.target.closest("[data-page]") : undefined;
    if (!closestDataPage)
        return;
    const page = <PageTypes>closestDataPage.getAttribute("data-page");
    if (page) {
        e.preventDefault();
        e.stopImmediatePropagation();
        navigate(page);
    }
});
