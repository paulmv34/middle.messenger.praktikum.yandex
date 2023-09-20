import Block from "../../core/Block";
import template from './contacts-list.hbs?raw';

interface IProps {
    list: IContactsListItem[]
}

export default class ContactsList extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
