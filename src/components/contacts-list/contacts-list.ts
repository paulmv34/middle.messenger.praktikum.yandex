import Block from "../../core/Block";
import { BlockProps, IContactsListItem } from "../../types/main.types";
import template from "./contacts-list.hbs?raw";

interface IProps extends BlockProps {
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
