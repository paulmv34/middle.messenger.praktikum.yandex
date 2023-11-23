import Block from "../../core/Block";
import { Props } from "../../types/types";
import template from "./contacts-search.hbs?raw";

interface IProps extends Props {
    search: string,
}

export default class ContactsSearch extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
