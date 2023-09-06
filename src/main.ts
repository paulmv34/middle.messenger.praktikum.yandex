import './style/main.scss'
import './main.types';
import Handlebars from 'handlebars';
import * as Components from './components';
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
    Handlebars.registerPartial(name, <Handlebars.TemplateDelegate<any> | string>component);
});

function navigate(page: PageTypes) {
    const [ source, context ]: [any, Context] = pages[page] as [any, Context];
    const container = document.getElementById('app');
    if (context.hasOwnProperty('title'))
        document.title = <string>context.title;
    if (container)
        container.innerHTML = Handlebars.compile(source)(context);
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
