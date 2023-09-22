import './style/main.scss'
import './types/main.types';
import Block from "./core/Block";
//import Handlebars from 'handlebars';
import * as Components from './components';
import {registerComponent} from './core/registerComponent';
import * as Pages from './pages';
import * as Contexts from './main.data';

const pages:{[key: string]: Object[]} = {
    'authorization': [ Pages.AuthorizationPage , Contexts.AuthorizationPageContext],
    'registration': [ Pages.RegistrationPage, Contexts.RegistrationPageContext],
    '404': [ Pages.ErrorPage, Contexts.Error404PageContext],
    '500': [ Pages.ErrorPage, Contexts.Error500PageContext],
    'empty-chat': [ Pages.ChatPage, Contexts.EmptyChatPageContext],
    'chat': [ Pages.ChatPage, Contexts.ChatPageContext],
    'profile': [ Pages.ProfilePage, Contexts.ProfilePageContext],
    'profileEdit': [ Pages.ProfilePage, Contexts.ProfileEditPageContext],
    'passwordEdit': [ Pages.ProfilePage, Contexts.PasswordEditPageContext],
};

Object.entries(Components).forEach(([ name, component ]) => {
    registerComponent(name, component);
    //Handlebars.registerPartial(name, <Handlebars.TemplateDelegate<any> | string>component);
});

/*
Object.entries(Pages).forEach(([ name, component ]) => {
    registerComponent(name, component);
});
*/

function navigate(page: PageTypes) {
    const [ PageComponent, context ]: [Block, IContext] = pages[page] as [Block, IContext];
    const container = document.getElementById('app');
    if (context.hasOwnProperty('title'))
        document.title = <string>context.title;
    //@ts-ignore
    let pageComponent = new PageComponent(context);
    if (container) {
        if (container.childNodes.length > 0)
            container.replaceChildren(pageComponent.getElement());
        else
            container.append(pageComponent.getElement());
    }
}

document.addEventListener('DOMContentLoaded', () => navigate('authorization'));

document.addEventListener('click', (e:MouseEvent) => {
    const closestDataPage = e.target instanceof Element ? e.target.closest('[data-page]') : undefined;
    if (!closestDataPage)
        return;
    const page = <PageTypes>closestDataPage.getAttribute('data-page');
    if (page) {
        e.preventDefault();
        e.stopImmediatePropagation();
        navigate(page);
    }
});
