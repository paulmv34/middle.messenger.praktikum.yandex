import Block from "../../core/Block";
import template from "./contacts-search.hbs?raw";

interface IProps {
    search: string,
}

export default class ContactsSearch extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
